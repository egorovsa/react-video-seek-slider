# react-video-seek-slider

![react-stores](https://github.com/egorovsa/react-video-seek-slider/blob/master/lib/example.png?raw=true)

React seek slider for video player like youtube

## How to install
```
npm i react-video-seek-slider --save
```

## How to use

```
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