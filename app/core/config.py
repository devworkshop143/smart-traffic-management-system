from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    APP_NAME: str = "Smart Traffic Management System"
    APP_VERSION: str = "1.0.0"
    ENVIRONMENT: str = "development"

    DATABASE_URL: str = "postgresql://traffic:traffic@db:5432/traffic_db"
    TEST_DATABASE_URL: str = "sqlite:///./test.db"

    SECRET_KEY: str = "super-secret-key-for-development-only-change-me"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 120

    ENABLE_PHYSICAL_SIGNAL_CONTROL: bool = False
    PHYSICAL_SIGNAL_API_URL: str = ""
    PHYSICAL_SIGNAL_API_KEY: str = ""

    ROUTING_API_URL: str = "https://api.example.com/routes"
    ROUTING_API_KEY: str = ""

    model_config = SettingsConfigDict(env_file=".env", case_sensitive=True)


settings = Settings()
