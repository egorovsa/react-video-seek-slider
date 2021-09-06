# react-video-seek-slider

The simplest and light weight video seeker like YouTube for React

Demo [react-video-seek-slider](http://video-seeker.egorov.pw/)

![react-video-seek-slider](https://github.com/egorovsa/react-video-seek-slider/blob/master/example.png?raw=true)

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
    <VideoSeekSlider
        max={1152}
        currentTime={this.state.currentTime}
        progress={400}
        onChange={(time)=>{
            this.setState({
                currentTime:time
            } as State);
        }}
        offset={0}
        secondsPrefix="00:00:"
        minutesPrefix="00:"
    />
```

### Specification

- `max` (number, required) - Max sliders value
- `currentTime` (number, required) - Current sliders value
- `progress` (number) - Current buffered progress
- `hideSeekTimes` (boolean) - hide hover current time (Default: false)
- `onChange` ((time:number, offsetTime:number)=>void, required) - script to be run when thumb change position
- `offset` (number, default:0) - when you need start slider with offset time
- `secondsPrefix` (string, default: '') - when video time is less than one minutes you can use prefix time as "00:00:"
- `minutesPrefix` (string, default: '') - when video time is less than one hour you can use prefix time as "00:"
- `limitTimeTooltipBySides` (boolean, default: false) - limit the time tooltip position inside track

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
