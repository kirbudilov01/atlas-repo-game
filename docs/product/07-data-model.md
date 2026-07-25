# 07 — Data Model

## Core Tables

### users

Purpose: identity.  
Fields: `id`, `telegram_id`, `username`, `created_at`, `last_seen_at`, `status`.  
Indexes: unique `telegram_id`.

### user_profiles

Fields: `user_id`, `display_name`, `role`, `level`, `xp`, `contribution_score`, `reputation_score`, `network_power`, `looking_for`, `can_help_with`.

### rooms

Fields: `id`, `owner_user_id nullable`, `type`, `name`, `status`.

### room_objects

Fields: `id`, `room_id`, `object_type`, `config_id`, `x`, `y`, `state`, `level`, `locked_condition`.
Indexes: `room_id`.

### assets

Fields: `id`, `asset_type_id`, `name`, `owner`, `status`, `condition`, `money_value`, `monthly_cost`, `utility_score`, `purpose`, `metadata`.

### projects

Fields: `id`, `slug`, `name`, `status`, `mission`, `owner`, `visibility`, `metadata`.

### products

Fields: `id`, `project_id`, `name`, `url`, `status`, `fabricbot_product_id`, `metadata`.

### generator_types

Fields: `id`, `slug`, `name`, `produces_resource`, `base_cost`, `base_rate`, `growth_rate`, `product_id`, `rarity`.

### user_generators

Fields: `id`, `user_id`, `generator_type_id`, `level`, `placed_room_object_id`, `created_at`, `last_collected_at`.
Unique: user/generator type if singleton, otherwise no unique.

### resource_balances

Fields: `user_id`, `resource`, `amount`, `updated_at`.  
Unique: `user_id`, `resource`.

### resource_transactions

Fields: `id`, `user_id`, `resource`, `amount`, `reason`, `source_type`, `source_id`, `idempotency_key`, `created_at`.
Unique: `idempotency_key`.

### click_sessions

Fields: `id`, `user_id`, `click_count`, `started_at`, `ended_at`, `compute_awarded`, `status`.

### missions

Fields: `id`, `slug`, `project_id`, `title`, `type`, `status`, `reward_config`, `requirements`.

### user_missions

Fields: `user_id`, `mission_id`, `status`, `progress`, `completed_at`, `claimed_at`.
Unique: `user_id`, `mission_id`.

### rewards

Fields: `id`, `slug`, `type`, `title`, `cost_class`, `limit_config`, `fabricbot_benefit_id`, `expires_in`.

### user_rewards

Fields: `id`, `user_id`, `reward_id`, `status`, `unlocked_at`, `claimed_at`, `expires_at`.

### referral_links

Fields: `id`, `user_id`, `campaign_id`, `product_id`, `code`, `url`, `created_at`.
Unique: `code`.

### referral_events

Fields: `id`, `referral_link_id`, `event_type`, `referred_user_id`, `metadata`, `created_at`.

### referral_conversions

Fields: `id`, `referrer_user_id`, `referred_user_id`, `product_id`, `amount`, `status`, `hold_until`, `reward_status`.

### partner_balances

Fields: `user_id`, `currency`, `pending_amount`, `available_amount`, `lifetime_amount`.

### funding_campaigns

Fields: `id`, `project_id`, `title`, `goal_amount`, `raised_amount`, `status`, `use_of_funds`, `reward_tiers`, `legal_type`.

### reality_updates

Fields: `id`, `season_id`, `title`, `body`, `linked_asset_id`, `linked_project_id`, `published_at`.

### audit_logs

Fields: `id`, `actor_user_id`, `action`, `target_type`, `target_id`, `metadata`, `created_at`.

## Additional Tables

- `subscriptions`;
- `benefits`;
- `user_benefits`;
- `contributions`;
- `reputation_events`;
- `connections`;
- `masteries`;
- `user_masteries`;
- `episodes`;
- `seasons`;
- `content_items`;
- `feature_flags`.

