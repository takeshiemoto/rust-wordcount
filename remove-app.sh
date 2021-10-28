#!/bin/bash

cd apps || exit

for file in *; do
  nx generate remove "$file" --forceRemove
done

touch apps/.gitkeep
