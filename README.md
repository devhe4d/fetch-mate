# Your fetch mate! 

[![npm](https://img.shields.io/npm/v/fetch-mate.svg?style=flat-square)](http://npm.im/fetch-mate)
[![MIT License](https://img.shields.io/npm/l/easy-peasy.svg?style=flat-square)](http://opensource.org/licenses/MIT)


Hey there! 

Are you tired of struggling with complex client-side data fetching in your React projects? Say hello to <strong>fetch-mate</strong> - the simple, lightweight library that makes it a breeze to request and cache data from any source. 

No need to get overwhelmed by tons of configuration options - fetch-mate's intuitive interface is perfect for beginners or those looking for a straightforward solution. Whether you're working with a REST API, GraphQL, or a database, fetch-mate has got you covered

- Simple, intuitive interface
- Support for REST, GraphQL, and other data sources
- Ability to cache data in memory or in the browser
- Automatic refetching of data on specified intervals


All of this comes via a single dependency install.

```
npm install fetch-mate
```
or
```
yarn add fetch-mate
```


## Quick Start 
fetch-mate can act as simple as a single custom hook around your data source with additional options to control your data flow, options like: isLoading, isError, isDone, error and of course the data itself.

by default fetch-mate doesn't cache anything, its just a single hook do its job:

```javascript
 const { data, isLoading, error } = useFetchMate({
        src: () => fetch('https://jsonplaceholder.typicode.com/todos/1').then((res) => res.json())
    });
 ```
 
but if you want to have a global store and a cache layer, fetch-mate also has option for it, just use FetchMateStore as your global store 
 ```javascript
 const fetchMateConfig = new FetchMateConfig({
    ttl: 1000 * 60 * 60 * 24,
    cacheType: 'memory'
});

<FetchMateStore config={fetchMateConfig}>
    <App />
</FetchMateStore>
```


## Contribution 🥳
We welcome contributions to fetch-mate!
fetch-mate still is in alpha release, if you're a beginner looking to practice contributing to an open source project, or an experienced developer looking to help out, we'd love to have you on board. Whether you want to fix a bug, add a new feature, or simply improve the documentation, every contribution helps us make fetch-mate better.

If you're new to open source contributions, check out the [Open Source Guides](https://opensource.guide/) for helpful resources and tips. Then, take a look at our [issues](https://github.com/devhe4d/fetch-mate/issues) page to see where you can help out.

Thanks in advance for your support!
