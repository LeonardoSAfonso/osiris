#!/bin/sh

HOST=$(echo $1 | cut -d: -f1)
PORT=$(echo $1 | cut -d: -f2)
TIMEOUT="${2:-15}"
START_TS=$(date +%s)

echo "⏳ Aguardando $HOST:$PORT (timeout: ${TIMEOUT}s)..."

while :
do
  nc -z "$HOST" "$PORT" >/dev/null 2>&1
  result=$?

  if [ $result -eq 0 ]; then
    END_TS=$(date +%s)
    echo "✅ $HOST:$PORT está disponível após $((END_TS - START_TS))s"
    break
  fi

  CURRENT_TS=$(date +%s)
  if [ $((CURRENT_TS - START_TS)) -ge $TIMEOUT ]; then
    echo "❌ Timeout após $TIMEOUT segundos aguardando por $HOST:$PORT"
    exit 1
  fi

  sleep 1
done
