// PROTOTYPE - NOT FOR PRODUCTION
// Question: Đỡ đòn, phản đòn 0,2 giây, thanh Danh Vọng và túi tiền chuộc tự do có đủ kéo người chơi qua 50 trận, bốn chương, tới một trong ba cái kết không?
// Date: 2026-11-13
// Every tuning value lives here, each with value, min, max and step. The game reads them live
// through tune.<name> (index.html); the tweak panel, an add-on, writes them back here.
// Units: seconds (s), arena units (u, about 1 m), per second (/s), degrees (deg), points.
window.CONFIG = {
  seed: 1, // every gameplay random call reads rng(), seeded from this (or ?seed= in the address)
  volume: { value: 0.5, min: 0, max: 1, step: 0.05 },

  // ---- Arena and camera
  arena_radius: { value: 9.0, min: 6, max: 12, step: 0.25 },          // u, where fighters stop
  cam_fov: { value: 55, min: 30, max: 90, step: 1 },                  // deg, third-person view behind Kael
  cam_dist: { value: 7.2, min: 2, max: 14, step: 0.1 },               // u behind Kael
  cam_height: { value: 4.0, min: 1, max: 10, step: 0.1 },             // u above the sand
  cam_side: { value: 1.8, min: -3, max: 3, step: 0.05 },              // u to his right: over the shoulder
  cam_look: { value: 0.55, min: 0, max: 1, step: 0.05 },              // how far toward the foe the camera aims
  cam_turn: { value: 5, min: 0.5, max: 20, step: 0.5 },               // rad/s the camera swings to keep the foe in view
  cam_mercy_dist: { value: 5.5, min: 2, max: 12, step: 0.1 },         // u, the side view for Tha hay Giết
  cam25_fov: { value: 36, min: 25, max: 60, step: 1 },                // deg, the fixed 2.5D view (V switches)
  cam25_height: { value: 22, min: 8, max: 30, step: 0.5 },          // u above the sand
  cam25_back: { value: 17.5, min: 6, max: 30, step: 0.5 },            // u south of the target (about 50 deg)
  cam25_follow: { value: 0.3, min: 0, max: 1, step: 0.05 },           // how far the fixed view drifts toward the fight

  // ---- Kael
  kael_hp: { value: 100, min: 20, max: 300, step: 5 },
  kael_speed: { value: 5.0, min: 1, max: 10, step: 0.1 },             // u/s
  kael_block_speed: { value: 1.8, min: 0, max: 6, step: 0.1 },        // u/s while the shield is up
  kael_turn: { value: 12, min: 2, max: 30, step: 1 },                 // rad/s, turning to face the foe
  kael_hitstun: { value: 0.35, min: 0, max: 1.5, step: 0.05 },        // s

  // ---- Stamina (from the notes: 100, light 10, heavy 25, roll 20, block 5/s, regen 15/s, winded 1.5 s)
  stamina_max: { value: 100, min: 20, max: 300, step: 5 },
  stamina_light: { value: 10, min: 0, max: 50, step: 1 },
  stamina_heavy: { value: 25, min: 0, max: 80, step: 1 },
  stamina_roll: { value: 20, min: 0, max: 80, step: 1 },
  stamina_block_per_s: { value: 5, min: 0, max: 40, step: 1 },
  stamina_regen: { value: 15, min: 1, max: 80, step: 1 },             // /s when not attacking, rolling or blocking
  stamina_regen_delay: { value: 0.5, min: 0, max: 2, step: 0.05 },    // s after spending before regen starts
  winded_time: { value: 1.5, min: 0, max: 4, step: 0.1 },             // s standing to breathe at 0 stamina
  block_hit_stamina: { value: 8, min: 0, max: 50, step: 1 },          // a normal blow taken on the shield
  guardbreak_stamina: { value: 30, min: 0, max: 100, step: 1 },       // a red blow taken on the shield
  guardbreak_time: { value: 0.7, min: 0, max: 2, step: 0.05 },        // s Kael reels after his guard breaks
  guardbreak_damage: { value: 0.5, min: 0, max: 1, step: 0.05 },      // share of a red blow that gets through the shield

  // ---- Parry (the notes: block within 0.2 s before the hit, foe stunned 1 s)
  parry_window: { value: 0.2, min: 0.05, max: 0.5, step: 0.01 },      // s
  parry_stun: { value: 1.0, min: 0.2, max: 3, step: 0.1 },            // s
  parry_hitstop: { value: 0.12, min: 0, max: 0.4, step: 0.01 },       // s frozen on a parry
  parry_slow: { value: 0.35, min: 0.1, max: 1, step: 0.05 },          // time scale just after a parry
  parry_slow_time: { value: 0.35, min: 0, max: 1.5, step: 0.05 },     // s of slow motion
  hit_hitstop: { value: 0.055, min: 0, max: 0.3, step: 0.005 },       // s frozen on a landed hit
  stun_damage_mult: { value: 1.3, min: 1, max: 3, step: 0.05 },       // hits on a stunned foe

  // ---- Kael's attacks (committed: a swing plays out)
  light_windup: { value: 0.09, min: 0.03, max: 0.5, step: 0.01 },
  light_active: { value: 0.08, min: 0.03, max: 0.3, step: 0.01 },
  light_recover: { value: 0.24, min: 0.05, max: 1, step: 0.01 },
  light_dmg: { value: 8, min: 1, max: 40, step: 1 },
  light3_dmg: { value: 12, min: 1, max: 50, step: 1 },                // the third hit of the string
  light_range: { value: 1.9, min: 0.8, max: 3, step: 0.05 },         // u
  light_arc: { value: 110, min: 30, max: 220, step: 5 },              // deg
  light_lunge: { value: 0.45, min: 0, max: 2, step: 0.05 },           // u stepped forward
  chain_frac: { value: 0.2, min: 0, max: 1, step: 0.05 },             // share of recovery before the next hit of a string can start
  heavy_hold: { value: 0.26, min: 0.1, max: 0.8, step: 0.02 },        // s held for a heavy
  heavy_windup: { value: 0.42, min: 0.1, max: 1.2, step: 0.01 },
  heavy_active: { value: 0.1, min: 0.03, max: 0.3, step: 0.01 },
  heavy_recover: { value: 0.5, min: 0.1, max: 1.5, step: 0.01 },
  heavy_dmg: { value: 22, min: 1, max: 80, step: 1 },
  heavy_range: { value: 2.1, min: 0.8, max: 3.5, step: 0.05 },
  heavy_lunge: { value: 0.7, min: 0, max: 2.5, step: 0.05 },
  heavy_poise: { value: 30, min: 0, max: 100, step: 1 },              // poise a heavy takes from Grull
  light_poise: { value: 8, min: 0, max: 50, step: 1 },
  cancel_frac: { value: 0.6, min: 0, max: 1, step: 0.05 },            // share of recovery before a roll can cut it
  combo_gap: { value: 2.0, min: 0.5, max: 5, step: 0.1 },             // s between hits before the combo count resets
  input_buffer: { value: 0.35, min: 0, max: 1, step: 0.05 },          // s a press is remembered while busy

  // ---- Roll
  roll_time: { value: 0.4, min: 0.2, max: 1, step: 0.01 },           // s
  roll_iframes: { value: 0.32, min: 0, max: 1, step: 0.01 },          // s safe from its first frame
  roll_dist: { value: 4.2, min: 1, max: 8, step: 0.1 },               // u

  // ---- Danh Vọng (fame) 0-100
  fame_start: { value: 35, min: 0, max: 100, step: 1 },
  fame_combo_hit: { value: 5, min: 0, max: 30, step: 1 },             // each hit from the third of a combo on
  fame_parry: { value: 15, min: 0, max: 50, step: 1 },
  fame_heavy: { value: 3, min: 0, max: 20, step: 1 },
  fame_guardbreak: { value: 6, min: 0, max: 30, step: 1 },
  fame_perfect_dodge: { value: 3, min: 0, max: 20, step: 1 },         // a roll through a red blow
  fame_flawless: { value: 20, min: 0, max: 60, step: 1 },             // a fight won without losing health
  fame_wall: { value: 8, min: 0, max: 30, step: 1 },                  // Grull rams the fence
  fame_dodge_spam: { value: 6, min: 0, max: 30, step: 1 },            // lost per roll past the free ones in a chain
  dodge_chain_window: { value: 2.2, min: 0.5, max: 5, step: 0.1 },    // s between rolls that count as one chain
  dodge_chain_free: { value: 2, min: 0, max: 6, step: 1 },            // rolls in a chain before the crowd minds
  idle_time: { value: 3, min: 1, max: 10, step: 0.5 },                // s standing still before the crowd minds
  fame_idle_per_s: { value: 4, min: 0, max: 30, step: 1 },
  fame_hit_taken: { value: 3, min: 0, max: 20, step: 1 },
  fame_boo: { value: 20, min: 0, max: 60, step: 1 },                  // under this the crowd boos and throws stones
  fame_choose: { value: 70, min: 0, max: 100, step: 1 },              // at or over this Kael decides Grull's fate
  frenzy_time: { value: 8, min: 1, max: 20, step: 0.5 },              // s of Cuồng Nhiệt at 100
  frenzy_dmg_mult: { value: 1.5, min: 1, max: 3, step: 0.05 },
  fame_after_frenzy: { value: 60, min: 0, max: 95, step: 1 },
  stone_interval: { value: 2.2, min: 0.5, max: 8, step: 0.1 },        // s between stones while booed
  stone_flight: { value: 0.95, min: 0.3, max: 2, step: 0.05 },        // s a stone is in the air
  stone_dmg: { value: 4, min: 0, max: 20, step: 1 },

  // ---- Thần Lực and Ignar's fire (Q): the crowd's cheers fill it, full it waits for Q
  divine_start: { value: 0, min: 0, max: 100, step: 1 },
  divine_from_fame: { value: 0.9, min: 0, max: 5, step: 0.05 },       // Thần Lực per point of fame gained
  divine_frenzy_per_s: { value: 6, min: 0, max: 40, step: 1 },        // /s more during Cuồng Nhiệt
  ignar_windup: { value: 0.38, min: 0.1, max: 1.5, step: 0.01 },      // s, Kael cannot be hurt until the fire lands
  ignar_active: { value: 0.18, min: 0.05, max: 0.5, step: 0.01 },
  ignar_recover: { value: 0.45, min: 0.1, max: 1.5, step: 0.01 },
  ignar_dmg: { value: 40, min: 1, max: 150, step: 1 },                // goes through Cassius's shield
  ignar_range: { value: 4.2, min: 1.5, max: 8, step: 0.1 },           // u
  ignar_arc: { value: 220, min: 60, max: 360, step: 5 },              // deg in front of Kael
  ignar_stun: { value: 1.4, min: 0, max: 4, step: 0.1 },              // s the foe reels, on fire
  ignar_knock: { value: 6, min: 0, max: 15, step: 0.5 },              // u/s pushed back
  fame_ignar: { value: 10, min: 0, max: 40, step: 1 },

  // ---- Tân binh (recruit): slow, light, flinches on every hit
  recruit_hp: { value: 60, min: 10, max: 200, step: 5 },
  recruit_speed: { value: 2.4, min: 0.5, max: 6, step: 0.1 },
  recruit_slash_windup: { value: 0.6, min: 0.2, max: 1.5, step: 0.05 },
  recruit_slash_dmg: { value: 8, min: 1, max: 40, step: 1 },
  recruit_heavy_windup: { value: 0.95, min: 0.3, max: 2, step: 0.05 },
  recruit_heavy_dmg: { value: 16, min: 1, max: 60, step: 1 },
  recruit_recover: { value: 0.85, min: 0.2, max: 2, step: 0.05 },     // s open after a string
  recruit_think: { value: 1.5, min: 0.2, max: 4, step: 0.1 },         // s circling between strings
  tutorial_parry_windup: { value: 0.85, min: 0.3, max: 2, step: 0.05 }, // the slow swing Brennus teaches parry on

  // ---- Cassius, the shield fighter: shield up, a heavy breaks it, open after his strings
  shield_hp: { value: 90, min: 10, max: 300, step: 5 },
  shield_speed: { value: 2.3, min: 0.5, max: 6, step: 0.1 },
  shield_jab_windup: { value: 0.42, min: 0.15, max: 1.5, step: 0.02 },
  shield_jab_dmg: { value: 7, min: 1, max: 40, step: 1 },
  shield_bash_windup: { value: 0.7, min: 0.2, max: 1.5, step: 0.05 },
  shield_bash_dmg: { value: 12, min: 1, max: 40, step: 1 },
  shield_thrust_windup: { value: 0.85, min: 0.2, max: 2, step: 0.05 },
  shield_thrust_dmg: { value: 18, min: 1, max: 60, step: 1 },
  shield_recover: { value: 0.9, min: 0.2, max: 2.5, step: 0.05 },
  shield_think: { value: 1.1, min: 0.2, max: 4, step: 0.1 },
  shield_guardbreak: { value: 1.4, min: 0.3, max: 4, step: 0.1 },     // s his shield is down after a heavy
  shield_counter_hits: { value: 2, min: 1, max: 6, step: 1 },         // light hits on his shield before he bashes back
  shield_front_arc: { value: 150, min: 60, max: 300, step: 5 },       // deg his shield covers

  // ---- Grull Đồ Tể: slow, heavy, poise, enrages under half health
  grull_hp: { value: 220, min: 30, max: 800, step: 10 },
  grull_speed: { value: 2.0, min: 0.5, max: 6, step: 0.1 },
  grull_cleave_windup: { value: 0.65, min: 0.2, max: 1.5, step: 0.05 },
  grull_cleave_dmg: { value: 12, min: 1, max: 50, step: 1 },
  grull_slam_windup: { value: 1.05, min: 0.3, max: 2.5, step: 0.05 },
  grull_slam_dmg: { value: 28, min: 1, max: 80, step: 1 },
  grull_charge_windup: { value: 0.75, min: 0.3, max: 2, step: 0.05 },
  grull_charge_speed: { value: 7.5, min: 2, max: 15, step: 0.5 },     // u/s
  grull_charge_time: { value: 1.5, min: 0.5, max: 3, step: 0.1 },     // s running
  grull_charge_dmg: { value: 20, min: 1, max: 60, step: 1 },
  grull_sweep_windup: { value: 0.8, min: 0.3, max: 2, step: 0.05 },   // enraged only
  grull_sweep_dmg: { value: 20, min: 1, max: 60, step: 1 },
  grull_recover: { value: 1.15, min: 0.3, max: 3, step: 0.05 },
  grull_think: { value: 1.2, min: 0.2, max: 4, step: 0.1 },
  grull_poise: { value: 40, min: 5, max: 200, step: 5 },
  grull_stagger: { value: 0.9, min: 0.2, max: 3, step: 0.1 },         // s when his poise breaks
  grull_enrage_at: { value: 0.5, min: 0, max: 1, step: 0.05 },        // share of health
  grull_enrage_speed: { value: 1.35, min: 1, max: 3, step: 0.05 },
  grull_enrage_windup: { value: 0.78, min: 0.3, max: 1, step: 0.02 }, // windups shrink to this share
  wall_daze: { value: 1.5, min: 0.2, max: 4, step: 0.1 },             // s Grull is dazed after ramming the fence

  // ---- Nereus, giáo và lưới: trident pokes from afar, a thrown net (red: roll) that pins Kael, a lunge
  net_hp: { value: 80, min: 10, max: 300, step: 5 },
  net_speed: { value: 2.6, min: 0.5, max: 6, step: 0.1 },
  net_thrust_windup: { value: 0.5, min: 0.15, max: 1.5, step: 0.02 },
  net_thrust_dmg: { value: 8, min: 1, max: 40, step: 1 },
  net_lunge_windup: { value: 0.8, min: 0.2, max: 2, step: 0.05 },
  net_lunge_dmg: { value: 17, min: 1, max: 60, step: 1 },
  net_throw_windup: { value: 0.75, min: 0.2, max: 2, step: 0.05 },
  net_throw_range: { value: 3.4, min: 1.5, max: 6, step: 0.1 },       // u in front, where the net lands
  net_throw_radius: { value: 1.5, min: 0.5, max: 3, step: 0.1 },      // u
  net_time: { value: 1.8, min: 0.3, max: 5, step: 0.1 },              // s Kael is pinned if he does not struggle
  net_struggle: { value: 0.35, min: 0, max: 2, step: 0.05 },          // s each roll press takes off
  net_tangle_speed: { value: 0.25, min: 0, max: 1, step: 0.05 },      // share of walking speed in the net
  net_recover: { value: 0.9, min: 0.2, max: 2.5, step: 0.05 },
  net_think: { value: 1.2, min: 0.2, max: 4, step: 0.1 },

  // ---- Vex, song kiếm: fast strings, thin health, hops back after each string
  dual_hp: { value: 75, min: 10, max: 300, step: 5 },
  dual_speed: { value: 3.2, min: 0.5, max: 7, step: 0.1 },
  dual_cut_windup: { value: 0.34, min: 0.1, max: 1, step: 0.02 },
  dual_cut_dmg: { value: 6, min: 1, max: 30, step: 1 },
  dual_cross_windup: { value: 0.75, min: 0.2, max: 2, step: 0.05 },
  dual_cross_dmg: { value: 18, min: 1, max: 60, step: 1 },
  dual_recover: { value: 0.75, min: 0.2, max: 2.5, step: 0.05 },
  dual_think: { value: 0.9, min: 0.2, max: 4, step: 0.1 },
  dual_hop: { value: 7, min: 0, max: 15, step: 0.5 },                 // u/s pushed back when a string ends

  // ---- Sư tử Nemea: claws, a bite, a pounce; its hide turns blades until it is stunned
  lion_hp: { value: 240, min: 30, max: 900, step: 10 },
  lion_speed: { value: 3.4, min: 0.5, max: 8, step: 0.1 },
  lion_claw_windup: { value: 0.5, min: 0.15, max: 1.5, step: 0.02 },
  lion_claw_dmg: { value: 12, min: 1, max: 50, step: 1 },
  lion_bite_windup: { value: 0.85, min: 0.2, max: 2, step: 0.05 },
  lion_bite_dmg: { value: 24, min: 1, max: 80, step: 1 },
  lion_pounce_windup: { value: 0.8, min: 0.3, max: 2, step: 0.05 },   // the landing ring is fixed for the last 30%
  lion_pounce_time: { value: 0.55, min: 0.2, max: 1.5, step: 0.05 },  // s in the air
  lion_pounce_dmg: { value: 22, min: 1, max: 80, step: 1 },
  lion_swipe_windup: { value: 0.75, min: 0.2, max: 2, step: 0.05 },   // enraged only
  lion_swipe_dmg: { value: 18, min: 1, max: 60, step: 1 },
  lion_recover: { value: 1.0, min: 0.2, max: 3, step: 0.05 },
  lion_think: { value: 1.0, min: 0.2, max: 4, step: 0.1 },
  lion_poise: { value: 60, min: 5, max: 300, step: 5 },
  lion_hide: { value: 0.3, min: 0, max: 1, step: 0.05 },              // share of a blow's damage that gets through, unless stunned
  lion_miss_daze: { value: 1.3, min: 0, max: 4, step: 0.1 },          // s it reels after a pounce lands on nothing
  lion_enrage_at: { value: 0.5, min: 0, max: 1, step: 0.05 },
  lion_enrage_speed: { value: 1.25, min: 1, max: 3, step: 0.05 },
  lion_enrage_windup: { value: 0.82, min: 0.3, max: 1, step: 0.02 },

  // ---- The ladder: ten fights; a returning foe is tougher; two foes take turns
  vet_hp_mult: { value: 1.35, min: 1, max: 3, step: 0.05 },
  vet_speed_mult: { value: 1.12, min: 1, max: 2, step: 0.02 },
  vet_think_mult: { value: 0.8, min: 0.3, max: 1, step: 0.05 },
  // ---- Story scenes: the opening, before each fight, after Grull, the chapter's end (Esc skips)
  cutscenes: { value: 1, min: 0, max: 1, step: 1 },                   // 0: no scenes, fights start at once
  cut_cps: { value: 40, min: 10, max: 200, step: 5 },                 // letters a second as a line types out
  cut_hold: { value: 1.6, min: 0.3, max: 6, step: 0.1 },              // s a whole line stays before the next
  cut_hold_per_char: { value: 0.03, min: 0, max: 0.2, step: 0.005 },  // s more for each letter of it
  // ---- War drums: single big beats while each fight is called, silent in the fight
  drum_vol: { value: 2, min: 0, max: 3, step: 0.05 },                 // 0: no drums
  drum_duck: { value: 0.35, min: 0, max: 0.9, step: 0.05 },           // share the crowd bed drops by while the drums play
  drum_bpm: { value: 72, min: 30, max: 160, step: 2 },                // beats a minute while a fight is called
  cut_blip_vol: { value: 0.14, min: 0, max: 0.4, step: 0.01 },        // the typing voice's loudness
  cut_blip_every: { value: 2, min: 1, max: 6, step: 1 },              // a blip every N letters

  start_fight: { value: 1, min: 1, max: 50, step: 1 },                // the fight a run opens on (1: the lesson); for testing a later fight
  target_hold: { value: 1.5, min: 0, max: 5, step: 0.1 },             // u another foe must be closer by before Kael turns to it

  // ---- Denarii: every fight pays; Varro takes his share first; freedom is bought (the notes: 5000)
  purse_ch1: { value: 50, min: 0, max: 1000, step: 5 },               // denarii a fight pays in Hố Cát
  purse_ch2: { value: 120, min: 0, max: 1000, step: 5 },              // in Kinh Đô
  purse_ch3: { value: 200, min: 0, max: 1500, step: 5 },              // in Colossus
  purse_ch4: { value: 300, min: 0, max: 2000, step: 5 },              // in Trận Cuối
  boss_purse_mult: { value: 2.5, min: 1, max: 6, step: 0.1 },         // a boss pays this many times more
  reward_per_fame: { value: 1, min: 0, max: 20, step: 0.5 },          // denarii per point of fame as a fight ends
  demand_purse: { value: 150, min: 0, max: 1000, step: 10 },          // the crowd's demand met: this much more
  kill_purse: { value: 150, min: 0, max: 1000, step: 10 },            // Giết: the crowd throws blood money
  varro_cut: { value: 0.6, min: 0, max: 1, step: 0.05 },              // Varro takes 60%
  freedom_price: { value: 5000, min: 100, max: 50000, step: 100 },    // Tự Do needs this kept, and Lyra found
  bribe_price: { value: 800, min: 0, max: 5000, step: 50 },           // the eunuch's price for word of Lyra (after Severus)
  // ---- The crowd's demands (some fights of chapters 2-4 ask one)
  demand_fast_time: { value: 40, min: 10, max: 120, step: 1 },        // s to win in
  demand_parries: { value: 3, min: 1, max: 10, step: 1 },             // parries in the fight
  fame_demand: { value: 10, min: 0, max: 40, step: 1 },
  fame_deflect: { value: 8, min: 0, max: 40, step: 1 },               // an arrow parried off the shield

  // ---- Chương 2-4: Kael grows, the ladder's fighters grow faster (tier: chapter - 1; bosses keep their numbers)
  kael_hp_per_ch: { value: 15, min: 0, max: 60, step: 1 },
  kael_dmg_per_ch: { value: 0.12, min: 0, max: 0.5, step: 0.01 },
  tier_hp: { value: 0.2, min: 0, max: 1, step: 0.02 },
  tier_dmg: { value: 0.12, min: 0, max: 1, step: 0.02 },
  tier_speed: { value: 0.06, min: 0, max: 0.4, step: 0.01 },
  tier_think: { value: 0.1, min: 0, max: 0.3, step: 0.01 },           // shorter pauses between strings
  tier_windup: { value: 0.05, min: 0, max: 0.2, step: 0.01 },         // quicker tells
  boss_enrage_at: { value: 0.5, min: 0, max: 1, step: 0.05 },         // the new bosses rage under this share of health
  boss_enrage_speed: { value: 1.2, min: 1, max: 2, step: 0.05 },
  boss_enrage_windup: { value: 0.82, min: 0.3, max: 1, step: 0.02 },
  deflect_counter_windup: { value: 0.42, min: 0.15, max: 1.2, step: 0.02 }, // a master's cut back after turning a blow (parryable)
  // ---- Đấu sĩ rìu: heavy chops, poise, a spin when crowded
  axe_hp: { value: 120, min: 10, max: 400, step: 5 },
  axe_speed: { value: 2.2, min: 0.5, max: 6, step: 0.1 },
  axe_think: { value: 1.2, min: 0.2, max: 4, step: 0.05 },
  axe_recover: { value: 0.6, min: 0, max: 2, step: 0.05 },
  axe_poise: { value: 30, min: 5, max: 200, step: 5 },
  axe_chop_windup: { value: 0.5, min: 0.15, max: 2, step: 0.02 },
  axe_chop_dmg: { value: 13, min: 1, max: 60, step: 1 },
  axe_overhead_windup: { value: 0.9, min: 0.2, max: 2, step: 0.02 },
  axe_overhead_dmg: { value: 26, min: 1, max: 80, step: 1 },
  axe_spin_windup: { value: 0.8, min: 0.2, max: 2, step: 0.02 },
  axe_spin_dmg: { value: 18, min: 1, max: 60, step: 1 },
  // ---- Lính giáo: long pokes, a lunge from afar, a sweep up close
  spear_hp: { value: 85, min: 10, max: 300, step: 5 },
  spear_speed: { value: 2.6, min: 0.5, max: 6, step: 0.1 },
  spear_think: { value: 1.1, min: 0.2, max: 4, step: 0.05 },
  spear_recover: { value: 0.5, min: 0, max: 2, step: 0.05 },
  spear_poke_windup: { value: 0.45, min: 0.15, max: 2, step: 0.02 },
  spear_poke_dmg: { value: 10, min: 1, max: 60, step: 1 },
  spear_lunge_windup: { value: 0.8, min: 0.2, max: 2, step: 0.02 },
  spear_lunge_dmg: { value: 20, min: 1, max: 80, step: 1 },
  // ---- Cung thủ: keeps away and shoots; a knife up close
  archer_hp: { value: 55, min: 10, max: 300, step: 5 },
  archer_speed: { value: 2.6, min: 0.5, max: 6, step: 0.1 },
  archer_think: { value: 1.3, min: 0.2, max: 4, step: 0.05 },
  archer_recover: { value: 0.5, min: 0, max: 2, step: 0.05 },
  archer_range: { value: 11, min: 3, max: 20, step: 0.5 },            // u
  archer_arrow_speed: { value: 32, min: 5, max: 80, step: 1 },        // u/s, how it looks in flight
  archer_shot_windup: { value: 0.7, min: 0.2, max: 2, step: 0.02 },
  archer_shot_dmg: { value: 9, min: 1, max: 60, step: 1 },
  archer_power_windup: { value: 1.1, min: 0.2, max: 3, step: 0.02 },
  archer_power_dmg: { value: 18, min: 1, max: 80, step: 1 },
  archer_knife_windup: { value: 0.4, min: 0.15, max: 2, step: 0.02 },
  archer_knife_dmg: { value: 8, min: 1, max: 60, step: 1 },
  // ---- Vệ binh Hoàng gia: a shield, quick jabs, a bash, a long thrust
  guard_hp: { value: 110, min: 10, max: 400, step: 5 },
  guard_speed: { value: 2.9, min: 0.5, max: 6, step: 0.1 },
  guard_think: { value: 0.9, min: 0.2, max: 4, step: 0.05 },
  guard_recover: { value: 0.45, min: 0, max: 2, step: 0.05 },
  guard_jab_windup: { value: 0.38, min: 0.15, max: 2, step: 0.02 },
  guard_jab_dmg: { value: 10, min: 1, max: 60, step: 1 },
  guard_bash_windup: { value: 0.6, min: 0.15, max: 2, step: 0.02 },
  guard_bash_dmg: { value: 16, min: 1, max: 60, step: 1 },
  guard_thrust_windup: { value: 0.75, min: 0.2, max: 2, step: 0.02 },
  guard_thrust_dmg: { value: 20, min: 1, max: 80, step: 1 },
  // ---- Trùm 15 · Sabina, Cung Thần: arrows, a power shot, a rain of arrows on a ring under Kael
  sabina_hp: { value: 180, min: 30, max: 800, step: 10 },
  sabina_speed: { value: 3.2, min: 0.5, max: 6, step: 0.1 },
  sabina_think: { value: 1.0, min: 0.2, max: 4, step: 0.05 },
  sabina_recover: { value: 0.5, min: 0, max: 2, step: 0.05 },
  sabina_shot_windup: { value: 0.6, min: 0.2, max: 2, step: 0.02 },
  sabina_shot_dmg: { value: 11, min: 1, max: 60, step: 1 },
  sabina_power_dmg: { value: 22, min: 1, max: 80, step: 1 },
  sabina_rain_windup: { value: 1.2, min: 0.3, max: 3, step: 0.05 },
  sabina_rain_dmg: { value: 20, min: 1, max: 80, step: 1 },
  sabina_rain_radius: { value: 2.2, min: 0.8, max: 5, step: 0.1 },    // u
  // ---- Trùm 20 · Castor và Pollux: shield-and-spear and two blades; one falls, the other rages
  twin_a_hp: { value: 150, min: 30, max: 600, step: 10 },
  twin_b_hp: { value: 110, min: 30, max: 600, step: 10 },
  twin_dmg_mult: { value: 1.2, min: 0.5, max: 3, step: 0.05 },
  // ---- Trùm 25 · Xe chiến Crixus: hide-proof; lure it into a pillar, then cut the driver
  chariot_hp: { value: 160, min: 30, max: 800, step: 10 },
  chariot_speed: { value: 4.5, min: 1, max: 10, step: 0.1 },          // u/s round the ring
  chariot_ring: { value: 6.2, min: 3, max: 8.5, step: 0.1 },          // u from the centre it drives at
  chariot_think: { value: 2.2, min: 0.5, max: 6, step: 0.1 },         // s between charges
  chariot_aim_time: { value: 1.3, min: 0.4, max: 3, step: 0.05 },     // s the red lane shows (it locks at 75%)
  chariot_charge_speed: { value: 13, min: 4, max: 25, step: 0.5 },
  chariot_dmg: { value: 30, min: 1, max: 100, step: 1 },
  chariot_hide: { value: 0.1, min: 0, max: 1, step: 0.05 },           // share of a blow that gets through, unless it has crashed
  chariot_crash_stun: { value: 2.6, min: 0.5, max: 6, step: 0.1 },    // s the driver reels after a pillar
  pillar_count: { value: 4, min: 0, max: 8, step: 1 },
  pillar_dist: { value: 4.4, min: 2, max: 8, step: 0.1 },             // u from the centre
  pillar_r: { value: 0.55, min: 0.3, max: 1.2, step: 0.05 },
  pillar_hp: { value: 2, min: 1, max: 5, step: 1 },                   // crashes a pillar takes before it falls
  // ---- Trùm 30 · Đô đốc Marinus: the flooded arena; trident and net, a tide, a whirlpool
  admiral_hp: { value: 240, min: 30, max: 900, step: 10 },
  admiral_speed: { value: 2.4, min: 0.5, max: 6, step: 0.1 },
  admiral_think: { value: 1.1, min: 0.2, max: 4, step: 0.05 },
  admiral_recover: { value: 0.6, min: 0, max: 2, step: 0.05 },
  admiral_dmg_mult: { value: 1.4, min: 0.5, max: 3, step: 0.05 },     // on Nereus's moves
  admiral_tide_windup: { value: 1.0, min: 0.3, max: 3, step: 0.05 },
  admiral_tide_dmg: { value: 22, min: 1, max: 80, step: 1 },
  admiral_tide_radius: { value: 3.2, min: 1, max: 6, step: 0.1 },
  admiral_whirl_windup: { value: 1.1, min: 0.3, max: 3, step: 0.05 },
  admiral_whirl_dmg: { value: 18, min: 1, max: 80, step: 1 },
  water_slow: { value: 0.75, min: 0.3, max: 1, step: 0.05 },          // Kael's speed in the water
  // ---- Trùm 35 · Voi chiến Hanno: tusks, a stomp, a charge; raging, a trunk sweep all round
  elephant_hp: { value: 360, min: 50, max: 1200, step: 10 },
  elephant_speed: { value: 2.0, min: 0.5, max: 6, step: 0.1 },
  elephant_think: { value: 1.4, min: 0.2, max: 4, step: 0.05 },
  elephant_recover: { value: 0.8, min: 0, max: 2, step: 0.05 },
  elephant_poise: { value: 60, min: 5, max: 300, step: 5 },
  elephant_stomp_windup: { value: 1.0, min: 0.3, max: 3, step: 0.05 },
  elephant_stomp_dmg: { value: 28, min: 1, max: 80, step: 1 },
  elephant_tusk_windup: { value: 0.6, min: 0.2, max: 2, step: 0.02 },
  elephant_tusk_dmg: { value: 18, min: 1, max: 80, step: 1 },
  elephant_sweep_dmg: { value: 24, min: 1, max: 80, step: 1 },
  elephant_charge_time: { value: 1.4, min: 0.4, max: 3, step: 0.05 },
  elephant_charge_speed: { value: 9, min: 2, max: 20, step: 0.5 },
  elephant_charge_dmg: { value: 32, min: 1, max: 100, step: 1 },
  // ---- Trùm 40 · Praetor Severus (and a guard): a guard's moves, harder, poise, a shield charge
  praetor_hp: { value: 260, min: 30, max: 900, step: 10 },
  praetor_speed: { value: 3.0, min: 0.5, max: 6, step: 0.1 },
  praetor_think: { value: 0.9, min: 0.2, max: 4, step: 0.05 },
  praetor_recover: { value: 0.5, min: 0, max: 2, step: 0.05 },
  praetor_poise: { value: 40, min: 5, max: 300, step: 5 },
  praetor_dmg_mult: { value: 1.35, min: 0.5, max: 3, step: 0.05 },
  praetor_charge_speed: { value: 10, min: 2, max: 20, step: 0.5 },
  // ---- Trùm 45 · Brennus: Kael's own strings; turns aside light blows and cuts back
  mentor_hp: { value: 250, min: 30, max: 900, step: 10 },
  mentor_speed: { value: 3.4, min: 0.5, max: 6, step: 0.1 },
  mentor_think: { value: 0.8, min: 0.2, max: 4, step: 0.05 },
  mentor_recover: { value: 0.45, min: 0, max: 2, step: 0.05 },
  mentor_deflect: { value: 0.45, min: 0, max: 1, step: 0.05 },        // chance a light blow is turned aside while he is not attacking
  mentor_cut_windup: { value: 0.36, min: 0.15, max: 2, step: 0.02 },
  mentor_cut_dmg: { value: 13, min: 1, max: 60, step: 1 },
  mentor_heavy_windup: { value: 0.75, min: 0.2, max: 2, step: 0.02 },
  mentor_heavy_dmg: { value: 26, min: 1, max: 80, step: 1 },
  // ---- Trùm 50 · Kẻ Bất Bại: fast cuts, deflects; at half health a scene, then fire ahead and a gold nova
  golden_hp: { value: 340, min: 50, max: 1200, step: 10 },
  golden_speed: { value: 3.6, min: 0.5, max: 6, step: 0.1 },
  golden_think: { value: 0.75, min: 0.2, max: 4, step: 0.05 },
  golden_recover: { value: 0.45, min: 0, max: 2, step: 0.05 },
  golden_poise: { value: 45, min: 5, max: 300, step: 5 },
  golden_deflect: { value: 0.4, min: 0, max: 1, step: 0.05 },
  golden_cut_windup: { value: 0.34, min: 0.15, max: 2, step: 0.02 },
  golden_cut_dmg: { value: 15, min: 1, max: 60, step: 1 },
  golden_heavy_windup: { value: 0.7, min: 0.2, max: 2, step: 0.02 },
  golden_heavy_dmg: { value: 28, min: 1, max: 80, step: 1 },
  golden_flame_windup: { value: 1.0, min: 0.3, max: 3, step: 0.05 },
  golden_flame_dmg: { value: 26, min: 1, max: 80, step: 1 },
  golden_nova_windup: { value: 1.1, min: 0.3, max: 3, step: 0.05 },
  golden_nova_dmg: { value: 30, min: 1, max: 100, step: 1 },

  // ---- Models (iteration 10): KayKit figures
  model_height: { value: 2.3, min: 1.5, max: 4, step: 0.05 },        // u, a figure of look scale 1, feet to crown
  model_blend: { value: 0.1, min: 0.02, max: 0.4, step: 0.01 },       // s cross-fade between clips
  crest_y: { value: 0.3, min: 0, max: 1, step: 0.02 },                // head units: the red crest over a helmet
  model_glow: { value: 0.45, min: 0.1, max: 1, step: 0.05 },          // share of the drawn figures' glow (red tell, hit flash, a god's light) a model shows

  // ---- Kael's moves (iteration 10)
  spin_windup: { value: 0.12, min: 0.03, max: 0.6, step: 0.01 },      // the 4th light: a spin all round
  spin_active: { value: 0.2, min: 0.05, max: 0.5, step: 0.01 },
  spin_recover: { value: 0.42, min: 0.1, max: 1.2, step: 0.01 },
  spin_dmg: { value: 14, min: 1, max: 60, step: 1 },
  spin_range: { value: 2.3, min: 1, max: 4, step: 0.05 },
  heavy_arc: { value: 160, min: 60, max: 360, step: 5 },               // deg
  dash_windup: { value: 0.04, min: 0.01, max: 0.3, step: 0.01 },      // a cut straight out of a roll: a lunge
  dash_active: { value: 0.12, min: 0.05, max: 0.4, step: 0.01 },
  dash_recover: { value: 0.3, min: 0.05, max: 1, step: 0.01 },
  dash_dmg: { value: 14, min: 1, max: 60, step: 1 },
  dash_lunge: { value: 2.6, min: 0, max: 5, step: 0.1 },              // u
  dash_from: { value: 0.4, min: 0, max: 1, step: 0.05 },              // share of the roll after which a cut becomes the lunge
  dash_window: { value: 0.3, min: 0, max: 1, step: 0.05 },            // s after a roll a cut is still a lunge
  bash_windup: { value: 0.08, min: 0.02, max: 0.4, step: 0.01 },      // a cut with the shield up: a bash
  bash_active: { value: 0.1, min: 0.05, max: 0.3, step: 0.01 },
  bash_recover: { value: 0.35, min: 0.1, max: 1, step: 0.01 },
  bash_dmg: { value: 6, min: 0, max: 40, step: 1 },
  bash_lunge: { value: 0.9, min: 0, max: 3, step: 0.1 },
  bash_stun: { value: 0.9, min: 0.2, max: 3, step: 0.05 },            // s the foe reels; a shield breaks
  stamina_bash: { value: 12, min: 0, max: 60, step: 1 },
  exec_hp: { value: 0.25, min: 0, max: 0.6, step: 0.01 },             // a heavy, lunge or bash on a reeling foe left under this share of its health finishes it
  exec_slow: { value: 0.45, min: 0, max: 1.5, step: 0.05 },           // s of slow time on an execution
  fame_exec: { value: 10, min: 0, max: 40, step: 1 },
  launch_vy: { value: 6.5, min: 0, max: 15, step: 0.5 },              // u/s up: a body thrown by the last blow
  gravity: { value: 22, min: 5, max: 60, step: 1 },                   // u/s2

  // ---- The five gods (iteration 10): Thần Lực spent per spell, each with a cooldown, unlocked by fight
  divine_per_hit: { value: 1.5, min: 0, max: 15, step: 0.5 },         // Thần Lực per blade hit (heavy and spin 1.6x)
  divine_regen: { value: 0.2, min: 0, max: 10, step: 0.1 },           // /s while a fight is on
  unlock_ignar: { value: 25, min: 1, max: 50, step: 1 },              // Crixus's chariot
  unlock_fulmen: { value: 15, min: 1, max: 50, step: 1 },             // Sabina
  unlock_thalassa: { value: 30, min: 1, max: 50, step: 1 },           // Marinus
  unlock_terrak: { value: 5, min: 1, max: 50, step: 1 },              // the fight whose boss holds the god (Grull); beaten, it is Kael's
  unlock_nox: { value: 40, min: 1, max: 50, step: 1 },                // Praetor Severus
  ignar_cost: { value: 15, min: 0, max: 100, step: 1 },
  ignar_cd: { value: 18, min: 0, max: 30, step: 0.5 },
  fulmen_cost: { value: 12, min: 0, max: 100, step: 1 },              // bolts on the nearest foes, numb
  fulmen_cd: { value: 15, min: 0, max: 30, step: 0.5 },
  fulmen_windup: { value: 0.28, min: 0.05, max: 1, step: 0.01 },
  fulmen_recover: { value: 0.4, min: 0.1, max: 1.5, step: 0.01 },
  fulmen_dmg: { value: 20, min: 1, max: 80, step: 1 },
  fulmen_stun: { value: 1.6, min: 0, max: 4, step: 0.1 },
  fulmen_range: { value: 10, min: 2, max: 20, step: 0.5 },
  fulmen_targets: { value: 3, min: 1, max: 8, step: 1 },
  thalassa_cost: { value: 12, min: 0, max: 100, step: 1 },            // a wave all round: pushes off, heals Kael
  thalassa_cd: { value: 20, min: 0, max: 30, step: 0.5 },
  thalassa_windup: { value: 0.25, min: 0.05, max: 1, step: 0.01 },
  thalassa_recover: { value: 0.4, min: 0.1, max: 1.5, step: 0.01 },
  thalassa_dmg: { value: 10, min: 0, max: 60, step: 1 },
  thalassa_radius: { value: 5, min: 2, max: 9, step: 0.25 },
  thalassa_knock: { value: 9, min: 0, max: 20, step: 0.5 },
  thalassa_stun: { value: 0.8, min: 0, max: 3, step: 0.1 },
  thalassa_heal: { value: 22, min: 0, max: 100, step: 1 },
  terrak_cost: { value: 12, min: 0, max: 100, step: 1 },              // a line of stone spikes ahead: launches
  terrak_cd: { value: 14, min: 0, max: 30, step: 0.5 },
  terrak_windup: { value: 0.32, min: 0.05, max: 1, step: 0.01 },
  terrak_recover: { value: 0.45, min: 0.1, max: 1.5, step: 0.01 },
  terrak_dmg: { value: 26, min: 1, max: 80, step: 1 },
  terrak_len: { value: 7.5, min: 2, max: 14, step: 0.25 },
  terrak_width: { value: 2.2, min: 0.8, max: 5, step: 0.1 },
  terrak_stun: { value: 1.4, min: 0, max: 4, step: 0.1 },
  terrak_launch: { value: 8, min: 0, max: 16, step: 0.5 },            // u/s up
  nox_cost: { value: 10, min: 0, max: 100, step: 1 },                 // a blink behind the foe, a stab, the foes slowed
  nox_cd: { value: 16, min: 0, max: 30, step: 0.5 },
  nox_windup: { value: 0.18, min: 0.03, max: 1, step: 0.01 },
  nox_recover: { value: 0.3, min: 0.1, max: 1.5, step: 0.01 },
  nox_dmg: { value: 28, min: 1, max: 80, step: 1 },
  nox_stun: { value: 1.0, min: 0, max: 3, step: 0.1 },
  nox_slow: { value: 0.45, min: 0.1, max: 1, step: 0.05 },            // the foes' time while Nox holds them
  nox_slow_time: { value: 3.5, min: 0, max: 10, step: 0.5 },          // s
  fame_spell: { value: 6, min: 0, max: 30, step: 1 },

  // ---- Hordes (iteration 10): lính quèn through the gate in normal fights from fight 2
  thug_hp: { value: 22, min: 1, max: 80, step: 1 },
  thug_speed: { value: 3.0, min: 0.5, max: 8, step: 0.1 },
  thug_think: { value: 1.1, min: 0.2, max: 4, step: 0.05 },
  thug_recover: { value: 0.45, min: 0, max: 2, step: 0.05 },
  thug_windup: { value: 0.5, min: 0.15, max: 1.5, step: 0.05 },
  thug_dmg: { value: 8, min: 1, max: 40, step: 1 },
  // ---- iteration 11: gods are won from bosses; the bosses wield them first; foes are tougher
  boss_spell_mult: { value: 0.5, min: 0, max: 1, step: 0.05 },        // a god's harm on a boss
  boss_spell_stun: { value: 0.4, min: 0, max: 1, step: 0.05 },        // how long a boss reels from a god, of the usual
  boss_quake_windup: { value: 1.0, min: 0.3, max: 3, step: 0.05 },     // Grull's Terrak: a red ring under Kael, then spikes
  boss_quake_dmg: { value: 24, min: 1, max: 80, step: 1 },
  boss_quake_radius: { value: 2.0, min: 0.5, max: 4, step: 0.1 },
  boss_storm_windup: { value: 0.9, min: 0.3, max: 3, step: 0.05 },     // Sabina's Fulmen: a red ring under Kael, then a bolt
  boss_storm_dmg: { value: 20, min: 1, max: 80, step: 1 },
  boss_storm_radius: { value: 1.5, min: 0.5, max: 4, step: 0.1 },
  boss_blink_windup: { value: 1.0, min: 0.3, max: 3, step: 0.05 },     // Severus's Nox: smoke, then behind Kael, then the blow
  boss_blink_at: { value: 0.45, min: 0.1, max: 0.9, step: 0.05 },      // share of the windup at which he comes out behind
  boss_blink_dmg: { value: 26, min: 1, max: 80, step: 1 },
  fire_patch_time: { value: 3, min: 0.5, max: 10, step: 0.25 },        // s the fire under Crixus's wheels burns (Ignar)
  fire_patch_r: { value: 0.8, min: 0.2, max: 2, step: 0.05 },
  fire_patch_dmg: { value: 7, min: 0, max: 40, step: 1 },              // each time it catches Kael
  fire_patch_gap: { value: 0.12, min: 0.05, max: 1, step: 0.01 },      // s between patches while it charges
  fire_ring_gap_mult: { value: 2.5, min: 1, max: 10, step: 0.5 },      // sparser fire while it drives the ring
  foe_hp_mult: { value: 1.25, min: 0.5, max: 3, step: 0.05 },          // every foe but the bosses
  boss_hp_mult: { value: 1.15, min: 0.5, max: 3, step: 0.05 },
  foe_dmg_mult: { value: 1.2, min: 0.5, max: 3, step: 0.05 },          // every foe's blows, bosses too
  foe_think_mult: { value: 0.8, min: 0.3, max: 2, step: 0.05 },        // the pause between their strings
  horde_ch1: { value: 4, min: 0, max: 30, step: 1 },                  // fodder per normal fight, by chapter
  horde_ch2: { value: 6, min: 0, max: 30, step: 1 },
  horde_ch3: { value: 8, min: 0, max: 30, step: 1 },
  horde_ch4: { value: 10, min: 0, max: 30, step: 1 },
  horde_at_once: { value: 3, min: 1, max: 10, step: 1 },              // on the sand at once (one more from chapter 3)
  horde_gap: { value: 1.4, min: 0.2, max: 6, step: 0.1 },             // s between two through the gate
  horde_first: { value: 1.2, min: 0, max: 10, step: 0.1 },            // s into the fight before the first
  horde_attackers: { value: 2, min: 1, max: 6, step: 1 },             // fodder that close in at once
  body_time: { value: 3, min: 0.5, max: 20, step: 0.5 },              // s a fallen one lies before it is dragged off
  multikill_window: { value: 1.5, min: 0.2, max: 5, step: 0.1 },      // s between kills that count as in a row
  fame_fodder: { value: 2, min: 0, max: 20, step: 1 },
  fame_multikill: { value: 3, min: 0, max: 20, step: 1 },             // more per kill in a row

  // ---- Crowd (cosmetic count)
  crowd_count: { value: 5600, min: 0, max: 8000, step: 100 },
};
