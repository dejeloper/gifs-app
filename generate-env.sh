#!/bin/bash

# Crear carpeta si no existe
mkdir -p src/environments

# Crear environment.development.ts
cat > src/environments/environment.development.ts <<EOL
export const environment = {
  production: false,
  companyName: '${COMPANY_NAME}',
  companySubName: '${COMPANY_SUBNAME}',
  companySlogan: '${COMPANY_SLOGAN}',

  giphyApiKey: '${GIPHY_API_KEY}',
  giphyUrl: '${GIPHY_URL}',
};
EOL

# Crear environment.ts
cat > src/environments/environment.ts <<EOL
export const environment = {
  production: true,
  companyName: '${COMPANY_NAME}',
  companySubName: '${COMPANY_SUBNAME}',
  companySlogan: '${COMPANY_SLOGAN}',

  giphyApiKey: '${GIPHY_API_KEY}',
  giphyUrl: '${GIPHY_URL}',
};
EOL

echo "✔️ Archivos environment generados correctamente"
