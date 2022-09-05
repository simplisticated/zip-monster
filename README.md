<p align="center">
    <a href="https://nodejs.org">
        <img src="https://img.shields.io/badge/Created for-Node.js-teal.svg?style=flat">
    </a>
    <a href="https://www.typescriptlang.org">
        <img src="https://img.shields.io/badge/Written in-TypeScript-purple.svg?style=flat">
    </a>
    <a href="https://tldrlegal.com/license/mit-license">
        <img src="https://img.shields.io/badge/License-MIT-blue.svg?style=flat">
    </a>
</p>

## At a Glance

**ZipMonster** is a library that simplifies work with zip codes and addresses in the United States.

## How to Get Started

Type in Terminal:

```
npm install --save @russo-programmisto/zip-monster
```

or, if you prefer **yarn** over **npm**, type:

```
yarn add @russo-programmisto/zip-monster
```

Then add import instruction to your code:

```typescript
import ZipMonster from '@russo-programmisto/zip-monster'
```

## Requirements

Basic knowledge of TypeScript and NPM.

## Usage

Everything starts from using `ZipMonster` object.

There are several ways for searching zip code information:

```typescript
ZipMonster.find({
    byZip: "91360"
})

ZipMonster.find({
    byCity: "Thousand Oaks"
})

ZipMonster.find({
    byCounty: "Ventura"
})

ZipMonster.find({
    byStateCode: "CA"
})
```

Method `ZipMonster.find` returns array of objects, where each object represents full information about one zip code. Example:

```typescript
{
    stateCode: "CA",
    city: "Thousand Oaks",
    county: "Ventura",
    zip: "91360",
    zipType: "Non-Unique",
    location: {
        latitude: 34.2090940366232,
        longitude: -118.875059125606
    }
}
```

If you know exact zip code, the method will return array with one object, so you can easily get information about the place:

```typescript
const zipCodes = ZipMonster.find({
    byZip: "91360"
});
const city = zipCodes[0].city // Thousand Oaks
```

If you don't use any filter with the method, it will return information about **all existing zip codes**:

```typescript
const zipCodes = ZipMonster.find();
zipCodes.length // more than 40k zip codes in the array
```

## License

**ZipMonster** is available under the MIT license. See the [LICENSE](./LICENSE) file for more info.
