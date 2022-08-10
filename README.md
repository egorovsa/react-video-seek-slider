# react-video-seek-slider

The simplest and light weight video seeker like YouTube for React

Demo [react-video-seek-slider](http://video-seeker.egorov.pw/)

![react-video-seek-slider](https://github.com/egorovsa/react-video-seek-slider/blob/master/example.png?raw=true)

## Braking changes from v4 -> v5

All time values you pass to props like `max`, `currentTime` and `progress` now are im milliseconds instead of seconds. 

`onChange` prop will also return `time` param in milliseconds as well.

## How to install

```
npm i react-video-seek-slider
or
yarn add react-video-seek-slider

```

## How to import

For TypeScript usage there is a index.d.ts

```typescript
import { VideoSeekSlider } from "react-video-seek-slider";
```

Also you have to use css file in a lib folder:

```
import "react-video-seek-slider/styles.css"
```

## How to use

```jsx harmony
//JSX
    const [currentTime, setCurrentTime] = useState(0);
    /// ..... 
    <VideoSeekSlider
        max={1152}
        currentTime={currentTime}
        progress={400}
        onChange={setCurrentTime}
        offset={0}
        secondsPrefix="00:00:"
        minutesPrefix="00:"
    />
```

### Specification

- `max` (number, required) - video duration (in milliseconds)
- `currentTime` (number, required) - current video progress (in milliseconds)
- `progress` (number) - Current buffer progress (in milliseconds)
- `hideSeekTimes` (boolean) - hide hover seek time (Default: false)
- `onChange` ((time:number, offsetTime:number)=>void, required) - script to be run when thumb change position
- `offset` (number, default:0) - when you need start slider with offset time
- `minutesPrefix` (string, default: '') - when video duration is less than an hour you can use time prefix like "0:" so the time tooltip will show e.g "0:25:23"
- `secondsPrefix` (string, default: '') - when video duration is less than one minute it's possible to use time prefix like "0:00:" and the time tooltip will show e.g "0:00:10"
- `limitTimeTooltipBySides` (boolean, default: true) - limit the time tooltip position inside of the slider

## For development

just use:

```javascript 1.8
$ npm i
$ npm run start
```

open your browser http://localhost:3000

## For Build

```
$ npm run build
```
