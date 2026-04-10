#!/bin/bash
# Create a new topic from the template
# Usage: ./scripts/new-topic.sh <topic-name>

set -euo pipefail

if [ -z "${1:-}" ]; then
    echo "Usage: $0 <topic-name>"
    echo "Example: $0 transformer-architectures"
    exit 1
fi

TOPIC="$1"
BASE_DIR="$(cd "$(dirname "$0")/.." && pwd)"
TOPIC_DIR="$BASE_DIR/topics/$TOPIC"

if [ -d "$TOPIC_DIR" ]; then
    echo "Error: Topic '$TOPIC' already exists at $TOPIC_DIR"
    exit 1
fi

cp -r "$BASE_DIR/topics/_template" "$TOPIC_DIR"

# Update the index with creation date
sed -i "s/^updated: $/updated: $(date +%Y-%m-%d)/" "$TOPIC_DIR/wiki/_index.md"
sed -i "s/^updated: $/updated: $(date +%Y-%m-%d)/" "$TOPIC_DIR/wiki/_sources.md"

echo "Created topic: $TOPIC"
echo "  $TOPIC_DIR/raw/        <- put source material here"
echo "  $TOPIC_DIR/wiki/       <- LLM compiles wiki here"
echo "  $TOPIC_DIR/output/     <- query outputs go here"
echo ""
echo "Next: add files to raw/ then ask Claude to compile"
