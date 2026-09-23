# The player's walk and run (Mixamo FBX → the rig)

Freddy ships as one static mesh: no skeleton, no animation clips. The game has
always posed him with a procedural hinge rig (`CharacterRig` in `index.html`,
which cuts the mesh into its original rigid pieces and hangs them on hips,
knees, shoulders, elbows and a neck). That rig still runs the idle, the crouch
and the glide - but the actual **gait now comes from real animation**: the two
Mixamo FBX clips in the project root.

```
walking.fbx  ─┐
running.fbx  ─┤   tools/fbx-bake.js   ──►   freddy_anims.js   ──►   the page
              │   (retarget, no deps)        (generated sidecar)      loads it
```

## What ships

| file | role |
| --- | --- |
| `walking.fbx`, `running.fbx` | the source clips (Mixamo, 65-bone mocap skeleton, ~1.0 s / 0.7 s cycles) |
| `tools/fbx-read.js` | minimal Kaydara binary FBX reader (no npm packages) |
| `tools/fbx-bake.js` | retargets both clips onto the rig's 14 hinges and writes the sidecar |
| `tools/fbx-check.js` | offline sanity pass over the generated tables (limb travel, knee direction, loop) |
| `freddy_anims.js` | the generated sidecar - `window.FREDDY_ANIMS` (≈39 KB) |

`index.html` stays a single self-contained file: it never parses FBX. The
sidecar is a plain `<script src>` (the one load a `file://` page is always
allowed), and if it is missing the procedural cycle keeps the limbs moving -
the game never depends on it.

## Rebuilding it

```powershell
# look at what the FBX files contain (skeleton, channels, clip length)
node tools/fbx-bake.js --report

# retarget both clips and write freddy_anims.js
node tools/fbx-bake.js

# play the result back through the rig and check the limbs
node tools/fbx-check.js
```

Replace `walking.fbx` / `running.fbx` with any other Mixamo clip (export
"FBX Binary", "Without Skin", 30-60 fps) and re-run the two commands - the bone
names are matched by their `mixamorig:` names, so a differently named rig needs
`MAP` in `tools/fbx-bake.js` updated.

## How the retarget works

For every source bone the tool builds a world-space *delta* from the clip's own
reference pose:

```
D(bone, t) = Rworld(bone, t) · Rworld_rest(bone)⁻¹
```

and gives the matching hinge the local rotation that makes the target's world
rotation follow it:

```
Rworld_target = D(bone) · Rworld_target_rest
Rlocal_target = Rworld_target(parent)⁻¹ · Rworld_target
```

Because the target's own rest pose is the base of that product, Freddy's
proportions and hierarchy are never overwritten by Mixamo's - only the motion
is transferred. Two details matter and are both handled in the tool:

* **FBX Euler angles are extrinsic.** An FBX `RotationOrder` of 0 ("XYZ") is
  intrinsic `ZYX` in three.js (`EULER_ORDER` in `tools/fbx-bake.js`). Getting
  this wrong turns the whole skeleton inside out.
* **Rest poses that differ.** Mixamo's reference pose is a T-pose; Freddy's
  arms hang at his sides. A world-space delta taken from a T-pose would fold
  Freddy's arms into his chest, so for the arm chain `MAP[bone].neutral`
  switches the reference from the source's rest orientation to the clip's
  **average world orientation**: what transfers is the swing around the middle
  of the clip, riding on the pose the model was actually built in. The legs,
  spine and head share the source's reference stance, so they keep their
  clip's absolute pose (`neutral: 0`).

The hips' vertical lift is baked alongside the joint angles (`bob`, in metres,
scaled by hip height), which is what gives the walk its bounce.

`freddy_anims.js` is Euler XYZ in radians, one key per frame at 60 Hz, per
hinge - the page just interpolates between frames at `loco.phase`.

## How the game uses it

`CONFIG.CHARACTER.anims` is the whole tuning surface:

| key | meaning |
| --- | --- |
| `enabled` | false = never load the sidecar, keep the procedural cycle |
| `file`, `global` | the sidecar and the global it defines |
| `stride` | metres of travel per stride cycle - the cadence follows the player's real speed |
| `rateMin`, `rateMax` | cadence clamp (cycles/second), so a creep or a sprint never looks sped-up |
| `blend` | the speed at which the cycle has fully taken the limbs over |
| `runFrom`, `runFull` | the speed window where the run cycle cross-fades in |
| `crouch` | how much of the cycle survives a crouch |

Notes on the behaviour:

* One normalised phase drives both cycles, so a walk-to-run cross-fade never
  lands the two strides out of step.
* The cycle owns the spine, head and legs whenever the player is moving. The
  **arms** hand back to the procedural pose while he is holding a gun (the
  aiming pose is what the gun in front of his chest is built around) and the
  whole body hands back while he is gliding.
* `PlayerView.loco()` exposes the live state (phase, clip weight, walk/run mix,
  bounce) for debugging and for the scenario harness.

## Verifying

```powershell
node cdp-test.js fbxanim        # the clips load, drive the limbs, hand over correctly
node cdp-test.js charactermodel # the rig itself: 14 hinges, swing, crouch, glide
node tools/fbx-check.js         # offline: limb travel, knee direction, foot height
```

`scenarios/fbxanim.js` covers the data (cycle lengths, track shapes, hip/knee
swing, bounce), the speed-driven behaviour (cadence, walk→run cross-fade), the
hand-overs (glide, armed) and the fallback path with no sidecar at all.
