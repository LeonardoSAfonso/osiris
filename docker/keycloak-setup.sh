#!/usr/bin/env bash

# Executa a exportação usando o novo comando `kc.sh`
docker-compose exec keycloak /opt/keycloak/bin/kc.sh export \
  --dir /tmp \
  --realm osiris \
  --users realm_file

# Copia o arquivo exportado do container para o host
docker-compose exec keycloak cat /tmp/osiris-realm.json > osiris-realm.json
