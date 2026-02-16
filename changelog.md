# 16.02.26
Изучил стандартную ошибку микрофронтов - https://webpack.js.org/concepts/module-federation/#uncaught-error-shared-module-is-not-available-for-eager-consumption. Понял что надо добавить eager: true для shared dependencies, так как если этого не сделать либа не попадает в основной бандл и при обращении к ней будет ошибка.

# 14.02.26

* Переделал архитектуру с использованием микрофронтенда
* Добавил пакет `concurrently` для одновременного запуска хостового приложения и МФ
* Появился импорт import('remoteCharacter/Character') который импортирует компонент из МФ, `remoteCharacter` определяется в вебпак конфиге через` ModuleFederationPlugin.remotes`
* exposes внутри конфига МФ определяет что и как экспортировать
*  `React.lazy(() => import('remoteCharacter/Character'));` оборачивается в Suspsense, который в свою очередь ждет загрузки компонента и показывает его после успешной загрузки

TODO:
* Пока добавил eager: true для шаренных зависимостей чтобы пофиксить проблему https://webpack.js.org/concepts/module-federation/#uncaught-error-shared-module-is-not-available-for-eager-consumption, надо будет потом детальнее посмотреть что это и на что влияет
