-- Habilitar la extensión uuid-ossp para usar UUIDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Crear la tabla users
CREATE TABLE users (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    phone VARCHAR(15) NOT NULL,
    created_at DATE DEFAULT CURRENT_DATE NOT NULL
);

-- Crear la tabla conversations
CREATE TABLE conversations (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    messages TEXT,
    summary VARCHAR(255),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE
);

-- Crear la tabla messages
CREATE TABLE messages (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE,
    created_at DATE DEFAULT CURRENT_DATE NOT NULL,
    message TEXT NOT NULL,
    tokens INT NOT NULL
);

-- Crear la tabla configuration
CREATE TABLE configuration (
    id SERIAL PRIMARY KEY,
    personality VARCHAR(255) NOT NULL,
    response_format VARCHAR(255) NOT NULL
);
