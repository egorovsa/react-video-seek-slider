# react-video-seek-slider

React video seeker slider for video player like youtube

Demo [react-video-seek-slider](http://video-seeker.egorov.pw/)

![react-stores](https://github.com/egorovsa/react-video-seek-slider/blob/master/lib/example.png?raw=true)

## How to install
```
npm i react-video-seek-slider --save
```

## How to import
For TypeScript usage there is a index.d.ts in node_modules folder
```typescript
import {VideoSeekSlider} from 'react-video-seek-slider';
```

or

```javascript
var VideoSeekSlider = require('react-video-seek-slider');
```

## How to use
```typescript
//JSX
    <VideoSeekSlider
        max={1152}
        currentTime={this.state.currentTime}
        progress={400}
        onChange={(time:number)=>{
            this.setState({
                currentTime:time
            } as State);
        }}
    />
```

### Specification

+ `max` (number, required) - Max sliders value
+ `currentTime` (number, required) - Current sliders value
+ `progress` (number) - Current buffered progress
+ `hideSeekTimes` (boolean) - hide hover current time (Default: false)
+ `onChange` ((time:number)=>void, required) - script to be run when thumb change position

### For development

just use:

+ $ yarn
+ $ gulp

open your browser http://localhost:3000