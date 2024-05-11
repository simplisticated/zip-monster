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

**ZipMonster** is a library that simplifies work with zip codes and addresses in the United States. This solution is a reliable replacement for paid APIs that you can find on the Internet.

## How to Get Started

Type in Terminal:

```
npm install --save @simplisticated/zip-monster
```

or, if you prefer **yarn** over **npm**, type:

```
yarn add @simplisticated/zip-monster
```

Then add import instruction to your code:

```typescript
import ZipMonster from '@simplisticated/zip-monster'
```

or

```typescript
import Z from '@simplisticated/zip-monster'
```

## Requirements

It's strongly recommended to add `NODE_OPTIONS` flag to your `.env` file:

```
NODE_OPTIONS=--max-old-space-size=<AVAILABLE RAM SIZE IN MB>
```

For example, if you have 2GB RAM:

```
NODE_OPTIONS=--max-old-space-size=2048
```

## Usage

Everything starts from `Z` object.

The main method is `Z.find`. It's a super flexible way to search the information.

----

### Search by zip code

If you know exactly what zip code you're looking for, simply write:

```typescript
Z.find({
    zip: "91360"
})
```

In response, you will receive an array of `ZipInformation` objects that correspond to your search request. Each object includes the following data:

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

To get city name, you can write:

```typescript
const zipCodes = Z.find({
    zip: "91360"
});
const city = zipCodes[0].city // Thousand Oaks
```

----

### Search by city

You can also search by city:

```typescript
Z.find({
    city: "Thousand Oaks"
})
```

The expression above will return array of `ZipInformation` objects related to Thousand Oaks.

Also, you can search by part of city name:

```typescript
Z.find({
    city: {
        value: "THOUSAND",
        caseSensitive: false,
        wholeMatch: false
    }
})
```

which returns zip code information for all cities that contain `THOUSAND` in the name.

----

### Search by county

```typescript
Z.find({
    county: "Vermont"
})
```

or

```typescript
Z.find({
    county: {
        value: "vermont",
        caseSensitive: false,
        wholeMatch: true
    }
})
```

----

### Search by state

```typescript
Z.find({
    stateCode: "CA"
})
```

----

### Search by location

Let's find cities that are further to north than Palo Alto. That's a very simple task:

```typescript
const PaloAlto = Z.find({
    city: "Palo Alto",
    stateCode: "CA",
    withLocationOnly: true
})[0];
const placesFurtherToNorth = Z.find({
    location: {
        latitude: {
            value: PaloAlto.location!.latitude,
            direction: "to-north"
        }
    }
});
placesFurtherToNorth.length // 21404 places are further to north than Palo Alto
```

----

### Combine search parameters

You can also combine search parameters with each other:

```typescript
const result = Z.find({
    city: {
        value: "THOUSAND",
        caseSensitive: false,
        wholeMatch: false
    },
    county: {
        value: "Vent",
        caseSensitive: false,
        wholeMatch: false
    },
    stateCode: "CA"
})
const city = result[0].city // Thousand Oaks
```

----

### What about more complicated logic?

Let's find all zip codes between Austin and Oklahoma City:

```typescript
// Take the first zip code in Austin
const Austin = Z.find({
    city: "Austin",
    stateCode: "TX",
    withLocationOnly: true
})[0];

// Find places to north and east from Austin
const placesToNorthFromAustin = Z.find({
    location: {
        latitude: {
            value: Austin.location!.latitude,
            direction: "to-north"
        },
        longitude: {
            value: Austin.location!.longitude,
            direction: "to-east"
        }
    }
});

// Take the first zip code in Oklahoma City
const OklahomaCity = Z.find({
    city: "Oklahoma City",
    stateCode: "OK",
    withLocationOnly: true
})[0];

// Find places to south and west from Oklahoma City, but stop at Austin
const placesBetweenAustinAndOklahomaCity = Z.find({
    location: {
        latitude: {
            value: OklahomaCity.location!.latitude,
            direction: "to-south"
        },
        longitude: {
            value: OklahomaCity.location!.longitude,
            direction: "to-west"
        }
    },
    source: placesToNorthFromAustin
});

placesBetweenAustinAndOklahomaCity.length // 79 zip codes found
```

----

### Other cases

If you don't use any filter with the method, it will return information about **all existing zip codes**:

```typescript
const zipCodes = Z.find();
zipCodes.length // more than 40k zip codes in the array
```

----

## License

**ZipMonster** is available under the MIT license. See the [LICENSE](./LICENSE) file for more info.
