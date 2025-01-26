FROM nginx:latest

# Copiar o arquivo de configuração do Nginx para o contêiner
COPY nginx.conf /etc/nginx/nginx.conf

# Criar o diretório de cache
RUN mkdir -p /var/cache/nginx

# Configurar permissões para o diretório de cache
RUN chown -R nginx:nginx /var/cache/nginx


EXPOSE 80