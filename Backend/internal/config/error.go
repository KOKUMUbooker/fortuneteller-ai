package config

import "log"

func validate(cfg *Config) {
	if cfg.GeminiKey == "" {
		log.Fatal("At least one AI provider key must be set")
	}
}
