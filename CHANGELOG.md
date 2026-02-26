# CHANGELOG

## [v1.0.0](https://github.com/un-mec-paumer/todo-api-node/releases/tag/v1.0.0) - 2026-02-25 15:54:23+00:00

## What's Changed
* Feature/add tests by @un-mec-paumer in https://github.com/un-mec-paumer/todo-api-node/pull/1
* Feature/ci pipeline by @un-mec-paumer in https://github.com/un-mec-paumer/todo-api-node/pull/2
* Feature/add sonarcloud fix by @un-mec-paumer in https://github.com/un-mec-paumer/todo-api-node/pull/3
* feat : ajout de la route de health check by @iliesovni in https://github.com/un-mec-paumer/todo-api-node/pull/4
* Feature/api docs swagger by @HugoZins in https://github.com/un-mec-paumer/todo-api-node/pull/5
* fix: ajouter les étapes de test et de génération de rapport de couver… by @un-mec-paumer in https://github.com/un-mec-paumer/todo-api-node/pull/6
* fix: update ci with permision and update dep by @un-mec-paumer in https://github.com/un-mec-paumer/todo-api-node/pull/7
* Feature/code cleaning by @iliesovni in https://github.com/un-mec-paumer/todo-api-node/pull/10
* Fix sonarcloud by @un-mec-paumer in https://github.com/un-mec-paumer/todo-api-node/pull/11

## New Contributors
* @un-mec-paumer made their first contribution in https://github.com/un-mec-paumer/todo-api-node/pull/1
* @iliesovni made their first contribution in https://github.com/un-mec-paumer/todo-api-node/pull/4
* @HugoZins made their first contribution in https://github.com/un-mec-paumer/todo-api-node/pull/5

**Full Changelog**: https://github.com/un-mec-paumer/todo-api-node/commits/v1.0.0

### Feature

- general:
  - feature: added the dependabot ([0612445](https://github.com/un-mec-paumer/todo-api-node/commit/06124450a5d34a84c1c41badfa1b654704a429ab))
  - update welcome message and enhance error handling in Todo API tests ([14cc79d](https://github.com/un-mec-paumer/todo-api-node/commit/14cc79d9f4b01c69ae8222deb535f5ea512a1b7c))
  - restructure application by moving server logic to server.js and updating start script
test: add initial API and database tests ([f4fbfa2](https://github.com/un-mec-paumer/todo-api-node/commit/f4fbfa26be591f05c041157e9cd4746ccc957ca7))
  - readme ([d47a5e6](https://github.com/un-mec-paumer/todo-api-node/commit/d47a5e695ab8637e52c13b368b0dc7d3d1cc07bc)) ([#10](https://github.com/un-mec-paumer/todo-api-node/pull/10))
  - suppression des fonctions dangereuses ([e3d1517](https://github.com/un-mec-paumer/todo-api-node/commit/e3d1517d587c8c266a5e6cd83bc22db4391671a2)) ([#10](https://github.com/un-mec-paumer/todo-api-node/pull/10))
  - ajout de la route de health check ([9acb9a6](https://github.com/un-mec-paumer/todo-api-node/commit/9acb9a692397c6ba25862ca87b315c7335ba1229)) ([#4](https://github.com/un-mec-paumer/todo-api-node/pull/4))
  - add docker build in CI ([4107d64](https://github.com/un-mec-paumer/todo-api-node/commit/4107d647e09cc916d5ddd6cbfef0ca0a8d9b1633))

- error-handling:
  - add try/catch to todo routes ([d85f561](https://github.com/un-mec-paumer/todo-api-node/commit/d85f561e2989bb3e8c0f8d78816a9a5f5a2e0cf0))

- ci:
  - ajouter un fichier ci.yml pour la configuration du pipeline CI ([518a59c](https://github.com/un-mec-paumer/todo-api-node/commit/518a59c7ef133bfbd6caaed022525cef55cb2952))
  - add CI pipeline, tests, docker integration and env vars ([defa86c](https://github.com/un-mec-paumer/todo-api-node/commit/defa86c0ebf7b15ad11ec71019ae8a7874d8cf68)) ([#2](https://github.com/un-mec-paumer/todo-api-node/pull/2))

- docker:
  - ajouter un fichier Dockerfile pour la configuration de l'image ([e9e1863](https://github.com/un-mec-paumer/todo-api-node/commit/e9e1863854bf909ae1e75ef724c60550a3425102))

### Bug Fixes

- general:
  - updating dependabot ([a2f5bfc](https://github.com/un-mec-paumer/todo-api-node/commit/a2f5bfc8e422096ddd1a5defb36686870aae676c))
  - application of tips : move secrets to environment variables / Add todo.db to gitignore / Remove unused SECRET_KEY and API_KEY variables from app.js ([06ac386](https://github.com/un-mec-paumer/todo-api-node/commit/06ac38663cec0c97f48d172ed0a530d018949acf))
  - remove post-deploy health check steps from CI workflow ([6a7e685](https://github.com/un-mec-paumer/todo-api-node/commit/6a7e685fbbb0191666055cbf927d3014990dd923))
  - simplify Docker run command in staging and production deployment steps ([f39d444](https://github.com/un-mec-paumer/todo-api-node/commit/f39d444527d35d1dd2d430f4480221fbda3b9726))
  - update Docker image path to use repository owner and name variables ([5f2dd04](https://github.com/un-mec-paumer/todo-api-node/commit/5f2dd04483f58575c811017786498182bd221e49))
  - update Docker image path to use repository variable ([445b0fe](https://github.com/un-mec-paumer/todo-api-node/commit/445b0fe49b9db1a8b3af75a50834e5ad10e70a66))
  - update Docker image repository path in CI workflow ([c8ea66e](https://github.com/un-mec-paumer/todo-api-node/commit/c8ea66e2428b6c3a94a29a1ca0ceff6d44a96c90))
  - update Docker image repository path in CI workflow ([b383544](https://github.com/un-mec-paumer/todo-api-node/commit/b383544fc344ff0cb5aa9b63b541b41ab809c020))
  - fix server was empty ([39db31e](https://github.com/un-mec-paumer/todo-api-node/commit/39db31ecda0ec7add466f93591d4dc9896a26789))
  - fix dockerfile for sonarloud ([e3ef5b3](https://github.com/un-mec-paumer/todo-api-node/commit/e3ef5b3a7589f47c8a258baa85fc4ba84a3a712c))
  - fix exclude cicd of sonarcloud review ([69d25f3](https://github.com/un-mec-paumer/todo-api-node/commit/69d25f37a6ab9a97e6a843a69de0ef15d22334ab))
  - change path to node:path ([daa635b](https://github.com/un-mec-paumer/todo-api-node/commit/daa635b17971e03144ea75643aa4cdf8d50d9d31))
  - remove redundant password definition in DB_PASSWORD warning test ([77d032c](https://github.com/un-mec-paumer/todo-api-node/commit/77d032c3069f0c724a3baffe54a3a57dcf5538bc))
  - return to normal work ([2221584](https://github.com/un-mec-paumer/todo-api-node/commit/222158426ec86c3638ed5f5b26465f9e231e6794)) ([#11](https://github.com/un-mec-paumer/todo-api-node/pull/11))
  - update coverage report naming in CI workflow ([bb2698b](https://github.com/un-mec-paumer/todo-api-node/commit/bb2698b637fd68490e03fcb71f0027aa5fd548da)) ([#11](https://github.com/un-mec-paumer/todo-api-node/pull/11))
  - bad path in sonar config ([1d111fd](https://github.com/un-mec-paumer/todo-api-node/commit/1d111fddd98b4778890268aa8c339b9178210feb)) ([#11](https://github.com/un-mec-paumer/todo-api-node/pull/11))
  - improve the ci process ([dec76fb](https://github.com/un-mec-paumer/todo-api-node/commit/dec76fbf787f10e9ff1f4f82bdac245736fb2312)) ([#11](https://github.com/un-mec-paumer/todo-api-node/pull/11))
  - solve npm issue ([9adae7a](https://github.com/un-mec-paumer/todo-api-node/commit/9adae7ac72a3fd107b16ba3214d20aa53035d106))
  - update ci with permision and update dep ([9eae7cb](https://github.com/un-mec-paumer/todo-api-node/commit/9eae7cbbb8239866a77e4db89786b75999ee4ee3)) ([#7](https://github.com/un-mec-paumer/todo-api-node/pull/7))
  - ajouter les étapes de test et de génération de rapport de couverture dans le workflow SonarCloud ([323ecda](https://github.com/un-mec-paumer/todo-api-node/commit/323ecda5372b579044441902691f7106ef84d768)) ([#6](https://github.com/un-mec-paumer/todo-api-node/pull/6))
  - ci.yml merge issue ([c0d6344](https://github.com/un-mec-paumer/todo-api-node/commit/c0d6344c51d0ef4234b1f560facc6277d0ca81a4))
  - better config for ci.yml ([0be99e1](https://github.com/un-mec-paumer/todo-api-node/commit/0be99e19d4244a73c27229ca9f63189be78ce927))
  - add ogranization to the config file ([10345ca](https://github.com/un-mec-paumer/todo-api-node/commit/10345ca8224ec2d4f1413cde47b760e3602fa64c)) ([#3](https://github.com/un-mec-paumer/todo-api-node/pull/3))
  - change the sonarcloud scan config ([41f9088](https://github.com/un-mec-paumer/todo-api-node/commit/41f90883577433ae438ad448597bc351219ec80d)) ([#3](https://github.com/un-mec-paumer/todo-api-node/pull/3))
  - add fix from sonarcloud ([cb016c7](https://github.com/un-mec-paumer/todo-api-node/commit/cb016c7f669b3f07525cd84ac0a7c13b31507bc2)) ([#3](https://github.com/un-mec-paumer/todo-api-node/pull/3))

### Documentation

- general:
  - add missing period at the end of sentence in README ([d7f198e](https://github.com/un-mec-paumer/todo-api-node/commit/d7f198e62a14ac56f8eb2a9746a4e620d028e347))

### Refactor

- general:
  - rename variable typo in comment block ([a5a0712](https://github.com/un-mec-paumer/todo-api-node/commit/a5a07126e9b69dfa356d8d282d59ddc3270cc3c7))

- Dockerfile, docker-compose:
  - simplifier la configuration en supprimant l'image de développement et les volumes ([7740e34](https://github.com/un-mec-paumer/todo-api-node/commit/7740e348ba669ce94e67884107272e51b52f8899))

### Test

- general:
  - add missing space in test description string ([f39d077](https://github.com/un-mec-paumer/todo-api-node/commit/f39d07754758facce1ad2e760d9f5eb3bfac02a1))
  - add CRUD API tests with Jest and Supertest ([53f68f1](https://github.com/un-mec-paumer/todo-api-node/commit/53f68f1165762cbcfb411151df4f1955a556e155)) ([#1](https://github.com/un-mec-paumer/todo-api-node/pull/1))

\* *This CHANGELOG was automatically generated by [auto-generate-changelog](https://github.com/BobAnkh/auto-generate-changelog)*
