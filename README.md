# landRegistry-ethereum
Land registry on ethereum
##### Steps:

1. Compile and deploy contract
2. Update ```abis``` folder with abi of deployed contract
3. Update ```subgraph.yaml``` with contract address and startBlock and any event changes
4. Update ```mappings.ts``` logic if any changes
2. Create new subgraph in hosted service and copy subgraph slug
3. Generate types
4. Build subgraph
5. Authorize graph cli for deployment using token
6. Deploy subgraph

```
yarn install
npx hardhat compile
npx hardhat deploy --network polygonMumbai
yarn codegen

yarn build

graph auth https://api.thegraph.com/deploy/ <Your account's access token not subgraph's token>

yarn deploy
```

#### indexing