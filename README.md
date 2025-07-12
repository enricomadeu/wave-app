# Wave App 🌊

Aplicativo móvel desenvolvido em React Native para monitoramento e registro de alagamentos urbanos. Permite aos usuários visualizar, reportar e acompanhar ocorrências de enchentes em tempo real através de mapas interativos.

## 🚀 Tecnologias Utilizadas

- **React Native 0.72.6** - Framework para desenvolvimento mobile multiplataforma
- **Expo 49** - Plataforma para desenvolvimento React Native
- **React Navigation 6** - Navegação entre telas
- **React Native Maps** - Mapas interativos com Google Maps
- **Expo Location** - Serviços de geolocalização
- **AsyncStorage** - Armazenamento local de dados
- **JWT (JSON Web Tokens)** - Autenticação e autorização
- **Date-fns** - Manipulação de datas
- **React Native Elements** - Componentes UI
- **TypeScript** - Tipagem estática (parcial)

## 📋 Pré-requisitos

- Node.js 18+
- Expo CLI (`npm install -g expo-cli`)
- Android Studio (para Android) ou Xcode (para iOS)
- Expo Go app instalado no dispositivo móvel para desenvolvimento

## 🛠️ Instalação

1. **Clone o repositório:**
```bash
git clone <url-do-repositorio>
cd wave-app
```

2. **Instale as dependências:**
```bash
npm install
```

3. **Configure as variáveis de ambiente:**

Edite o arquivo `api/utils/constants.js` com a URL da sua API:
```javascript
export const api_url = "https://sua-api-backend.com";
```

4. **Inicie o projeto:**
```bash
npm start
```

5. **Execute no dispositivo:**
- Escaneie o QR code com o app Expo Go
- Ou execute `npm run android` / `npm run ios`

## 🚀 Scripts Disponíveis

- `npm start` - Inicia o servidor de desenvolvimento Expo
- `npm run android` - Executa no emulador/dispositivo Android
- `npm run ios` - Executa no simulador/dispositivo iOS
- `npm run web` - Executa na web (funcionalidade limitada)

## 🌟 Funcionalidades

### 🔐 Autenticação
- **Login**: Autenticação com email e senha
- **Cadastro**: Registro de novos usuários
- **JWT**: Gerenciamento seguro de sessões
- **Logout**: Encerramento de sessão

### 🗺️ Mapeamento
- **Visualização de Mapas**: Interface com Google Maps
- **Localização Atual**: GPS integrado para posicionamento
- **Marcadores Interativos**: Visualização de alagamentos no mapa
- **Navegação**: Integração com apps de navegação

### 📍 Gestão de Alagamentos
- **Visualizar Ocorrências**: Lista e mapa de alagamentos próximos
- **Reportar Novo Alagamento**: Criação de novos registros
- **Detalhes Completos**: Informações detalhadas de cada ocorrência
- **Cálculo de Distância**: Distância até cada alagamento
- **Ordenação**: Lista ordenada por proximidade

### 📱 Interface
- **Design Responsivo**: Adaptado para diferentes tamanhos de tela
- **Navegação Intuitiva**: Menu de acesso rápido
- **Feedback Visual**: Loading states e indicadores
- **Tema Personalizado**: Design consistente e moderno

## 🏗️ Arquitetura do Projeto

```
wave-app/
├── api/                    # Camada de serviços e API
│   ├── services/          # Serviços de negócio
│   │   ├── authService.js     # Autenticação
│   │   ├── floodServices.js   # Gestão de alagamentos
│   │   └── locationService.js # Serviços de localização
│   └── utils/             # Utilitários
│       ├── constants.js       # Constantes da aplicação
│       ├── functions.js       # Funções auxiliares
│       └── jwt.js            # Gerenciamento JWT
├── assets/                # Recursos estáticos
│   ├── images/           # Imagens e ícones
│   └── fonts/            # Fontes customizadas
├── components/           # Componentes React Native
│   ├── Cadastro/         # Tela de cadastro
│   ├── Login/            # Tela de login
│   ├── Home/             # Tela principal com mapa
│   ├── Listagem/         # Lista de alagamentos
│   ├── FloodDetails/     # Detalhes do alagamento
│   ├── Menu/             # Menu de navegação
│   ├── ModalAdd/         # Modal para adicionar alagamento
│   ├── ModalProfile/     # Modal do perfil do usuário
│   ├── FloodMarker/      # Marcador no mapa
│   └── CardListagem/     # Card da lista
├── App.js               # Componente raiz e navegação
├── Style.js             # Estilos globais
└── package.json         # Dependências e scripts
```

## 🗺️ Fluxo de Navegação

```
Login ──► Home (Mapa Principal)
│         │
│         ├── Listagem (Lista de Alagamentos)
│         │   └── FloodDetails (Detalhes)
│         │
│         ├── ModalAdd (Novo Alagamento)
│         └── ModalProfile (Perfil)
│
└── Cadastro (Registro)
```

## 📡 Integração com API

### Endpoints Utilizados

#### Autenticação
```javascript
// Login
POST /login
{
  "email": "usuario@email.com",
  "password": "senha123"
}

// Registro
POST /create-user
{
  "name": "Nome",
  "email": "email@exemplo.com",
  "password": "senha"
}
```

#### Alagamentos
```javascript
// Listar alagamentos próximos
GET /floods?latitude={lat}&longitude={lng}

// Detalhes de um alagamento
GET /floods/{id}

// Criar novo alagamento
POST /create-flood
{
  "latitude": -23.550520,
  "longitude": -46.633308,
  "description": "Descrição",
  "severity": "high"
}
```

## 🌍 Funcionalidades de Localização

### Recursos de GPS
- **Permissões**: Solicitação automática de permissões de localização
- **Posicionamento**: Obtenção da localização atual do usuário
- **Geocoding Reverso**: Conversão de coordenadas em endereços
- **Cálculo de Distância**: Algoritmo para calcular distância entre pontos
- **Centralização**: Centralização automática do mapa na localização

### Configurações de Mapa
- **Provider Google**: Integração com Google Maps
- **Controles**: Botões de localização e zoom
- **Interação**: Long press para adicionar novos marcadores
- **Marcadores**: Diferentes tipos para usuário e alagamentos

## 🔧 Configurações Avançadas

### Autenticação JWT
```javascript
// Estrutura do token
{
  "userId": "123",
  "email": "user@email.com",
  "name": "Nome do Usuário",
  "iat": 1234567890,
  "exp": 1234567890
}
```

### Persistência de Dados
```javascript
// AsyncStorage keys utilizadas
'userToken'     // Token JWT do usuário
'user'          // Dados do usuário
'latitude'      // Última latitude conhecida
'longitude'     // Última longitude conhecida
```

### Configuração de Mapas
```javascript
const mapConfig = {
  provider: PROVIDER_GOOGLE,
  showsUserLocation: true,
  showsMyLocationButton: true,
  followsUserLocation: true,
  loadingEnabled: true
};
```

## 📱 Componentes Principais

### Home (Mapa Principal)
- Visualização do mapa interativo
- Marcadores de alagamentos
- Posição atual do usuário
- Menu de ações flutuante

### Login/Cadastro
- Formulários de autenticação
- Validação de campos
- Estados de loading
- Navegação entre telas

### Listagem
- Lista de alagamentos próximos
- Ordenação por distância
- Cards informativos
- Navegação para detalhes

### FloodDetails
- Informações completas do alagamento
- Localização no mapa
- Dados de criação
- Opções de navegação

## 🚨 Tratamento de Erros

### Estratégias Implementadas
- **Network Errors**: Tratamento de falhas de conexão
- **Permission Errors**: Gerenciamento de permissões negadas
- **Authentication Errors**: Redirecionamento em caso de token inválido
- **Location Errors**: Fallback para localização padrão
- **User Feedback**: Alerts e mensagens informativas

## 🔒 Segurança

### Medidas Implementadas
- **JWT Tokens**: Autenticação stateless
- **Token Refresh**: Renovação automática de tokens
- **Secure Storage**: Armazenamento seguro de credenciais
- **API Authentication**: Headers de autorização em requisições
- **Input Validation**: Validação de entrada do usuário

## 📊 Performance

### Otimizações
- **Lazy Loading**: Carregamento sob demanda de componentes
- **Image Optimization**: Otimização de imagens e assets
- **State Management**: Gerenciamento eficiente de estado
- **API Caching**: Cache de requisições quando apropriado
- **Memory Management**: Limpeza de listeners e timers

## 🧪 Debugging

### Ferramentas Disponíveis
```bash
# Debug com Flipper
npx react-native log-android
npx react-native log-ios

# Debug remoto
# Shake device → "Debug with Chrome"

# Expo debugging
expo start --tunnel
```

## 📦 Build e Deploy

### Build de Desenvolvimento
```bash
# Android APK
expo build:android -t apk

# iOS IPA
expo build:ios -t archive
```

### Build de Produção
```bash
# Android App Bundle
eas build --platform android

# iOS App Store
eas build --platform ios
```

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

### Padrões de Código
- Use ESLint para formatação
- Componentes em PascalCase
- Funções em camelCase
- Constantes em UPPER_CASE
- Comentários em português

## 🐛 Problemas Conhecidos

- **Permissões de Localização**: Alguns dispositivos podem requerer configuração manual
- **Google Maps**: Necessária configuração de API key para produção
- **Background Location**: Limitações em segundo plano no iOS
- **Memory Usage**: Monitoramento necessário em sessões longas

## 📝 Licença

Este projeto não possui licença específica definida.

## 👨‍💻 Autor

**Enrico Madeu**

## 🔗 Links Úteis

- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [Expo Documentation](https://docs.expo.dev/)
- [React Navigation](https://reactnavigation.org/)
- [React Native Maps](https://github.com/react-native-maps/react-native-maps)
- [AsyncStorage](https://react-native-async-storage.github.io/async-storage/)

## 📞 Suporte

Para suporte e dúvidas sobre o aplicativo:
- Abra uma issue no repositório
- Entre em contato com a equipe de desenvolvimento

---

**Desenvolvido com ❤️ para monitoramento urbano inteligente**
