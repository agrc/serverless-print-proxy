# Changelog

## [2.0.5-0](https://github.com/agrc/serverless-print-proxy/compare/v2.0.4...v2.0.5-0) (2024-10-21)


### Bug Fixes

* more robust account number validation ([1f6a911](https://github.com/agrc/serverless-print-proxy/commit/1f6a911a5571aa08c6d7c43d2ef64ff1f5027236))


### Documentation

* add auth step for dev setup ([e89def9](https://github.com/agrc/serverless-print-proxy/commit/e89def9db042dbef58872c3c5926754b42087c2b))

## [2.0.4](https://github.com/agrc/serverless-print-proxy/compare/v2.0.3...v2.0.4) (2024-10-03)


### Dependencies

* FY25Q2 dependency updates 🌲 ([77adfdc](https://github.com/agrc/serverless-print-proxy/commit/77adfdc3a035a9ef02556b262e68bf1c5fc6fcb4))

## [2.0.4-0](https://github.com/agrc/serverless-print-proxy/compare/v2.0.3...v2.0.4-0) (2024-10-03)


### Dependencies

* FY25Q2 dependency updates 🌲 ([1ab6414](https://github.com/agrc/serverless-print-proxy/commit/1ab641407f3bc84515753c0cf579977d64d84640))

## [2.0.3](https://github.com/agrc/serverless-print-proxy/compare/v2.0.2...v2.0.3) (2024-09-09)


### Dependencies

* bump micromatch from 4.0.5 to 4.0.8 ([2ce5079](https://github.com/agrc/serverless-print-proxy/commit/2ce5079f69ed0f65374dc79129cbbd87e7202722))


### Documentation

* add note about default print service in portal ([74c3bf3](https://github.com/agrc/serverless-print-proxy/commit/74c3bf313a98bc9655203716950c9ba8eb233566))

## [2.0.2](https://github.com/agrc/serverless-print-proxy/compare/v2.0.1...v2.0.2) (2024-07-08)


### Bug Fixes

* relax default helmet policy to allow cross origin ([15075cf](https://github.com/agrc/serverless-print-proxy/commit/15075cfd8bbff65ed8cef9a288c12c7036239650))


### Dependencies

* **dev:** bump ws from 7.5.9 to 7.5.10 ([f43f1df](https://github.com/agrc/serverless-print-proxy/commit/f43f1df85c508281456d2ac5470e6b4c6d614f90))
* Q1 dependency bumps 🌲 ([c38b397](https://github.com/agrc/serverless-print-proxy/commit/c38b397f3d6c60e8a7bb7ee2dd157288f3867dbe))

## [2.0.2-1](https://github.com/agrc/serverless-print-proxy/compare/v2.0.1...v2.0.2-1) (2024-07-05)


### Bug Fixes

* relax default helmet policy to allow cross origin ([3d81d6a](https://github.com/agrc/serverless-print-proxy/commit/3d81d6aabfbc46c8653957099d10efd30adbf9aa))


### Dependencies

* **dev:** bump ws from 7.5.9 to 7.5.10 ([f43f1df](https://github.com/agrc/serverless-print-proxy/commit/f43f1df85c508281456d2ac5470e6b4c6d614f90))
* Q1 dependency bumps 🌲 ([44ca4fe](https://github.com/agrc/serverless-print-proxy/commit/44ca4fe41c6b0276bda09ba4432d8ea31418c602))

## [2.0.2-0](https://github.com/agrc/serverless-print-proxy/compare/v2.0.0...v2.0.2-0) (2024-06-21)


### 🐛 Bug Fixes

* add jsonp support ([d54e3dc](https://github.com/agrc/serverless-print-proxy/commit/d54e3dc88d280f41bef0c01227a4adee775f0693))

## [2.0.1](https://github.com/agrc/serverless-print-proxy/compare/v2.0.0...v2.0.1) (2024-06-12)


### 🐛 Bug Fixes

* handle requests with no account number ([e221c64](https://github.com/agrc/serverless-print-proxy/commit/e221c6498868488b99f847da44c7df03d4651ff4))
* use best secure practices for response headers ([6337cbb](https://github.com/agrc/serverless-print-proxy/commit/6337cbb366d5eba31b4637dcef9e408bae4c315c))


### 🌲 Dependencies

* bump @grpc/grpc-js from 1.10.8 to 1.10.9 ([14ce6e6](https://github.com/agrc/serverless-print-proxy/commit/14ce6e64b66872e133d183baeac1843f63d6774d))
* bump braces from 3.0.2 to 3.0.3 ([1f452aa](https://github.com/agrc/serverless-print-proxy/commit/1f452aa58eb711df1f37b8a12de99381de5c1c91))

## [2.0.1-0](https://github.com/agrc/serverless-print-proxy/compare/v2.0.0...v2.0.1-0) (2024-06-11)


### 🐛 Bug Fixes

* handle requests with no account number ([cfa389d](https://github.com/agrc/serverless-print-proxy/commit/cfa389d6b227b2a8338c104e6604d62957abf614))
* use best secure practices for response headers ([f102acc](https://github.com/agrc/serverless-print-proxy/commit/f102acc4b57ae977a054c9c1078360581d5b4b4c))

## [2.0.0](https://github.com/agrc/serverless-print-proxy/compare/v1.1.16...v2.0.0) (2024-06-10)


### ⚠ BREAKING CHANGES

* This new version requires a DNS and path change. Read [the v2 migration doc](https://github.com/agrc/serverless-print-proxy/blob/main/docs/v2-migration.md) for the details.

### 🚀 Features

* add support for experience builder ([22aff04](https://github.com/agrc/serverless-print-proxy/commit/22aff04d7e273ba6934fd8269aea358839156b07))


### 🐛 Bug Fixes

* close off all public access to firestore ([99c96aa](https://github.com/agrc/serverless-print-proxy/commit/99c96aa7ec3acae61dea0fa8202d7a6c33d742bb))
* fix dev cloud run service name ([10b3a8e](https://github.com/agrc/serverless-print-proxy/commit/10b3a8e8cac28139583d9bd2f4d5293705a6eed9))
* get version number directly from package json ([830ad2d](https://github.com/agrc/serverless-print-proxy/commit/830ad2d5087a59118860989082cd01f1ccf82564))
* migrate account.js to firestore ([27a2dba](https://github.com/agrc/serverless-print-proxy/commit/27a2dbab8c509f4fbd4e020dd0341c95581ee16e)), closes [#177](https://github.com/agrc/serverless-print-proxy/issues/177)


### 🌲 Dependencies

* bump deps ([0f4a94b](https://github.com/agrc/serverless-print-proxy/commit/0f4a94bf1a4b260b5a647c8a702b53fbf716a109))
* **dev:** bump the safe-dependencies group across 1 directory with 2 updates ([f101f92](https://github.com/agrc/serverless-print-proxy/commit/f101f921f6505af193c6abba9e9e6d07e31a8188))


### 📖 Documentation Improvements

* add v2 migration document ([3acf8a4](https://github.com/agrc/serverless-print-proxy/commit/3acf8a45ac01177337119f6619a580ffc0858046)), closes [#178](https://github.com/agrc/serverless-print-proxy/issues/178)
* clean up old reference to accounts.js ([a15f5ba](https://github.com/agrc/serverless-print-proxy/commit/a15f5ba02a8cac56119247eac522720bbcc391ef))

## [2.0.0-4](https://github.com/agrc/serverless-print-proxy/compare/v2.0.0-3...v2.0.0-4) (2024-06-10)


### 🐛 Bug Fixes

* close off all public access to firestore ([fce71f4](https://github.com/agrc/serverless-print-proxy/commit/fce71f428de41e89bb2679a637deb9da8cd00a0e))

## [2.0.0-3](https://github.com/agrc/serverless-print-proxy/compare/v2.0.0-2...v2.0.0-3) (2024-06-07)


### 📖 Documentation Improvements

* add v2 migration document ([88b3a0d](https://github.com/agrc/serverless-print-proxy/commit/88b3a0db1d424dbb723c5f1f6aedf1a7d12ad114)), closes [#178](https://github.com/agrc/serverless-print-proxy/issues/178)
* clean up old reference to accounts.js ([a0bff30](https://github.com/agrc/serverless-print-proxy/commit/a0bff3031875bd099450264f0e8c0849e135e3c9))

## [2.0.0-2](https://github.com/agrc/serverless-print-proxy/compare/v2.0.0-1...v2.0.0-2) (2024-06-04)


### 🐛 Bug Fixes

* fix dev cloud run service name ([bca9447](https://github.com/agrc/serverless-print-proxy/commit/bca94476f3acd17104cbaacf6feb6277b8c514bc))

## [2.0.0-1](https://github.com/agrc/serverless-print-proxy/compare/v2.0.0-0...v2.0.0-1) (2024-06-04)


### 🐛 Bug Fixes

* get version number directly from package json ([f7a96ab](https://github.com/agrc/serverless-print-proxy/commit/f7a96abf5211325ba57b4e5b1a96d5af4b20231f))
* migrate account.js to firestore ([cb55ba4](https://github.com/agrc/serverless-print-proxy/commit/cb55ba493810e8edc7e4bb910b7bc6dfb4a42bdc)), closes [#177](https://github.com/agrc/serverless-print-proxy/issues/177)


### 🌲 Dependencies

* bump deps ([ea31035](https://github.com/agrc/serverless-print-proxy/commit/ea31035c54df3572cd6fce05f6faf23c2394b32b))

## [2.0.0-0](https://github.com/agrc/serverless-print-proxy/compare/v1.1.16...v2.0.0-0) (2024-05-28)


### ⚠ BREAKING CHANGES

* 

### 🚀 Features

* add support for experience builder ([6049e12](https://github.com/agrc/serverless-print-proxy/commit/6049e12505a456340a58a8bd32584072cf83a16d))

## [1.1.16](https://github.com/agrc/serverless-print-proxy/compare/v1.1.15...v1.1.16) (2024-05-15)


### 🐛 Bug Fixes

* more graceful handling of invalid account numbers ([c36c257](https://github.com/agrc/serverless-print-proxy/commit/c36c2575183381f7fad41668fd80d5dd87d7a373))


### 🌲 Dependencies

* bump deps ([7779040](https://github.com/agrc/serverless-print-proxy/commit/7779040defabc4fc77a90686add79b87c07c657f))

## [1.1.16-0](https://github.com/agrc/serverless-print-proxy/compare/v1.1.15...v1.1.16-0) (2024-05-15)


### 🐛 Bug Fixes

* more graceful handling of invalid account numbers ([44f0b59](https://github.com/agrc/serverless-print-proxy/commit/44f0b595fc877d2f27bb4b364a44984e9b4a59f4))


### 🌲 Dependencies

* bump deps ([89f703a](https://github.com/agrc/serverless-print-proxy/commit/89f703af9895e7095def25d108cb142787cb7e5d))

## [1.1.15](https://github.com/agrc/serverless-print-proxy/compare/v1.1.14...v1.1.15) (2024-05-09)


### 🐛 Bug Fixes

* remove bluffdale account ([b79d0f8](https://github.com/agrc/serverless-print-proxy/commit/b79d0f803983eb83debacaeb1d7b208960df4bae))

## [1.1.14](https://github.com/agrc/serverless-print-proxy/compare/v1.1.13...v1.1.14) (2024-04-29)


### 🐛 Bug Fixes

* point enviro task at agol print service ([1457393](https://github.com/agrc/serverless-print-proxy/commit/14573935426070fd2dde6af756a29b3ccb26d119))

## [1.1.13](https://github.com/agrc/serverless-print-proxy/compare/v1.1.12...v1.1.13) (2024-04-15)


### 🌲 Dependencies

* bump the safe-dependencies group with 6 updates ([9ae2f90](https://github.com/agrc/serverless-print-proxy/commit/9ae2f9027eefd8c35d0ef4b28caf4e16cc228617))

## [1.1.12](https://github.com/agrc/serverless-print-proxy/compare/v1.1.11...v1.1.12) (2024-02-02)


### 🐛 Bug Fixes

* add missing get layout templates task name ([15098ea](https://github.com/agrc/serverless-print-proxy/commit/15098eaf57556619a9de857e9ee1732fd190aba7))
* better error handling ([2390dc0](https://github.com/agrc/serverless-print-proxy/commit/2390dc05d6b6ca73c6c7352f8f7aecb1780cebab))


### 🌲 Dependencies

* bump the major-dependencies group with 1 update ([831967e](https://github.com/agrc/serverless-print-proxy/commit/831967efabc2f96dc9e1838b9340c53c5e8efd6e))
* bump the safe-dependencies group with 7 updates ([c0289f6](https://github.com/agrc/serverless-print-proxy/commit/c0289f6fbb5a2bb461d41dec88d3699c6ade3ea5))

## [1.1.12-0](https://github.com/agrc/serverless-print-proxy/compare/v1.1.11...v1.1.12-0) (2024-02-01)


### 🐛 Bug Fixes

* add missing get layout templates task name ([3cf6008](https://github.com/agrc/serverless-print-proxy/commit/3cf6008eaaf800bc48865ff0b94532cf4de6f1a6))
* better error handling ([a1b05e4](https://github.com/agrc/serverless-print-proxy/commit/a1b05e4050c941d2f3d2d43107d173f104547896))


### 🌲 Dependencies

* bump the major-dependencies group with 1 update ([831967e](https://github.com/agrc/serverless-print-proxy/commit/831967efabc2f96dc9e1838b9340c53c5e8efd6e))
* bump the safe-dependencies group with 7 updates ([c0289f6](https://github.com/agrc/serverless-print-proxy/commit/c0289f6fbb5a2bb461d41dec88d3699c6ade3ea5))

## [1.1.11](https://github.com/agrc/serverless-print-proxy/compare/v1.1.10...v1.1.11) (2023-11-09)


### 🐛 Bug Fixes

* undo pinned DNS ([bf31a4c](https://github.com/agrc/serverless-print-proxy/commit/bf31a4c6ab83f1fd73a438446f700346e438421d))


### 🌲 Dependencies

* **dev:** bump the safe-dependencies group with 1 update ([8c3aca2](https://github.com/agrc/serverless-print-proxy/commit/8c3aca2085aa059549e79416e624c6c2cc20cd70))

## [1.1.10](https://github.com/agrc/serverless-print-proxy/compare/v1.1.9...v1.1.10) (2023-10-30)


### 🐛 Bug Fixes

* add dns cache ([c9019a5](https://github.com/agrc/serverless-print-proxy/commit/c9019a51481c60d0e3187e4b9749e1130402de39))

## [1.1.9](https://github.com/agrc/serverless-print-proxy/compare/v1.1.8...v1.1.9) (2023-10-17)


### 🌲 Dependencies

* **dev:** bump @babel/traverse from 7.23.0 to 7.23.2 ([03305a5](https://github.com/agrc/serverless-print-proxy/commit/03305a5e1bc91102ae16b333542c8a0ea8732f1f))

## [1.1.8](https://github.com/agrc/serverless-print-proxy/compare/v1.1.7...v1.1.8) (2023-10-17)


### 🐛 Bug Fixes

* allow for even larger payloads ([9fd9193](https://github.com/agrc/serverless-print-proxy/commit/9fd9193bbe02f49c5d940106fdfc77dcd99eca91))

## [1.1.7](https://github.com/agrc/serverless-print-proxy/compare/v1.1.6...v1.1.7) (2023-10-06)


### 🐛 Bug Fixes

* add missing prittier plugins config ([b4ce46d](https://github.com/agrc/serverless-print-proxy/commit/b4ce46df2b9ab75dd25d7873f860980a224157eb))

## [1.1.6](https://github.com/agrc/serverless-print-proxy/compare/v1.1.5...v1.1.6) (2023-04-19)


### 🐛 Bug Fixes

* switch to new pinned DNS ([950c030](https://github.com/agrc/serverless-print-proxy/commit/950c030a24043025c6a42959f5c1a65d7c8e64e8))

## [1.1.6-0](https://github.com/agrc/serverless-print-proxy/compare/v1.1.5...v1.1.6-0) (2023-04-19)


### 🐛 Bug Fixes

* switch to new pinned DNS ([efb77c7](https://github.com/agrc/serverless-print-proxy/commit/efb77c7c1004a3d2f6cefef34b5dc1d2735b9f46))

## [1.1.5](https://github.com/agrc/serverless-print-proxy/compare/v1.1.4...v1.1.5) (2023-04-04)


### 🐛 Bug Fixes

* switch to node LTS ([c677406](https://github.com/agrc/serverless-print-proxy/commit/c677406958c8abfcaf8bc30ac31ebcd0fc88706d))

## [1.1.4](https://github.com/agrc/serverless-print-proxy/compare/v1.1.3...v1.1.4) (2023-02-07)


### 🐛 Bug Fixes

* February dependency bumps 🌲 ([79e9079](https://github.com/agrc/serverless-print-proxy/commit/79e90799347fc8a946c972500f213f9fe2ab7c00))

## [1.1.3](https://github.com/agrc/serverless-print-proxy/compare/v1.1.2...v1.1.3) (2022-12-12)


### 🐛 Bug Fixes

* December dependency bumps 🌲 ([8064e37](https://github.com/agrc/serverless-print-proxy/commit/8064e37ca104fbb58221cfdcd8154e161593fa22))

## [1.1.3-0](https://github.com/agrc/serverless-print-proxy/compare/v1.1.2...v1.1.3-0) (2022-12-09)


### 🐛 Bug Fixes

* December dependency bumps 🌲 ([64f448d](https://github.com/agrc/serverless-print-proxy/commit/64f448dc4b6bde13350c42e88596540c7b236e18))

## [1.1.2](https://github.com/agrc/serverless-print-proxy/compare/v1.1.1...v1.1.2) (2022-11-03)


### 🐛 Bug Fixes

* make local dev work again ([8657da7](https://github.com/agrc/serverless-print-proxy/commit/8657da7f319bc8e85faa6c059d469666c15f5cce))
* November dependency bumps 🌲 ([1536732](https://github.com/agrc/serverless-print-proxy/commit/153673276cddf7910505068ec7f6862710816d12))

## [1.1.1](https://github.com/agrc/serverless-print-proxy/compare/v1.1.0...v1.1.1) (2022-10-07)


### 🐛 Bug Fixes

* **ci:** repo token inputs ([ff57ea6](https://github.com/agrc/serverless-print-proxy/commit/ff57ea6f18deb78e5f090dbbcf4c31a3c3fe2eda))
* **ci:** secrets syntax ([1c2fea5](https://github.com/agrc/serverless-print-proxy/commit/1c2fea510870bca47d9d830b2bdf7b25aef59c1a))
* October dependency bumps 🌲 ([b5b72f9](https://github.com/agrc/serverless-print-proxy/commit/b5b72f971f00bfcfd675857345f27981d85e3f3b))
* standardize actions ([a32a49b](https://github.com/agrc/serverless-print-proxy/commit/a32a49b135db9bb13d69b6542f066dffce6ece47))

## [1.1.1-2](https://github.com/agrc/serverless-print-proxy/compare/v1.1.1-1...v1.1.1-2) (2022-10-06)


### 🐛 Bug Fixes

* **ci:** repo token inputs ([362f80f](https://github.com/agrc/serverless-print-proxy/commit/362f80fd5f9ce3de561fae13ca50ffe2533c4ce5))

## [1.1.1-1](https://github.com/agrc/serverless-print-proxy/compare/v1.1.1-0...v1.1.1-1) (2022-10-06)


### 🐛 Bug Fixes

* **ci:** secrets syntax ([b8e2132](https://github.com/agrc/serverless-print-proxy/commit/b8e21328e773088fa751c0faa9613d97c022b61b))

## [1.1.1-0](https://github.com/agrc/serverless-print-proxy/compare/v1.1.0...v1.1.1-0) (2022-10-06)


### 🐛 Bug Fixes

* October dependency bumps 🌲 ([fa0b6a4](https://github.com/agrc/serverless-print-proxy/commit/fa0b6a49f616fdaec3f9ff4c68b4d0662ed660c8))
* standardize actions ([aa6ce2b](https://github.com/agrc/serverless-print-proxy/commit/aa6ce2b82a31d0fbe121d3ae05e8aa057bfd58c4))
