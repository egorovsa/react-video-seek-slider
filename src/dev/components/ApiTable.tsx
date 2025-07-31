export const ApiTable: React.FC = () => {
  return (
    <div className="api-table">
      <table>
        <thead>
          <tr>
            <th>Property</th>
            <th>Type</th>
            <th>Default</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>max</code>
              <div className="required-badge">[required]</div>
            </td>
            <td><code>number</code></td>
            <td>-</td>
            <td>Video duration (in milliseconds)</td>
          </tr>
          <tr>
            <td>
              <code>currentTime</code>
              <div className="required-badge">[required]</div>
            </td>
            <td><code>number</code></td>
            <td>-</td>
            <td>Current video progress (in milliseconds)</td>
          </tr>
          <tr>
            <td>
              <code>onChange</code>
              <div className="required-badge">[required]</div>
            </td>
            <td><code>(time: number, offsetTime: number) =&gt; void</code></td>
            <td>-</td>
            <td>Script to be run when thumb change position</td>
          </tr>
          <tr>
            <td><code>bufferTime</code></td>
            <td><code>number</code></td>
            <td>-</td>
            <td>Current buffer progress (in milliseconds)</td>
          </tr>
          <tr>
            <td><code>hideThumbTooltip</code></td>
            <td><code>boolean</code></td>
            <td><code>false</code></td>
            <td>Hide hover seek time</td>
          </tr>
          <tr>
            <td><code>offset</code></td>
            <td><code>number</code></td>
            <td><code>0</code></td>
            <td>When you need start slider with offset time</td>
          </tr>
          <tr>
            <td><code>minutesPrefix</code></td>
            <td><code>string</code></td>
            <td><code>&apos;&apos;</code></td>
            <td>When video duration is less than an hour you can use time prefix like &quot;0:&quot; so the time tooltip will show e.g &quot;0:25:23&quot;</td>
          </tr>
          <tr>
            <td><code>secondsPrefix</code></td>
            <td><code>string</code></td>
            <td><code>&apos;&apos;</code></td>
            <td>When video duration is less than one minute it&apos;s possible to use time prefix like &quot;0:00:&quot; and the time tooltip will show e.g &quot;0:00:10&quot;</td>
          </tr>
          <tr>
            <td><code>limitTimeTooltipBySides</code></td>
            <td><code>boolean</code></td>
            <td><code>true</code></td>
            <td>Limit the time tooltip position inside of the slider</td>
          </tr>
          <tr>
            <td><code>timeCodes</code></td>
            <td><code>TimeCode[]</code></td>
            <td><code>undefined</code></td>
            <td>Will divide slider into parts according to an array of times</td>
          </tr>
          <tr>
            <td><code>getPreviewScreenUrl</code></td>
            <td><code>(hoverTimeValue: number) =&gt; string</code></td>
            <td><code>undefined</code></td>
            <td>The callback function is going to be called each time when a slider is hovered. It will pass a current hover mouse time and expect a preview image url to be returned</td>
          </tr>
        </tbody>
      </table>
      
      <div className="api-section timecode-section">
        <h3 className="timecode-title">
          TimeCode Object
        </h3>
        <table>
          <thead>
            <tr>
              <th>Property</th>
              <th>Type</th>
              <th>Default</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <code>fromMs</code>
                <div className="required-badge">[required]</div>
              </td>
              <td><code>number</code></td>
              <td>-</td>
              <td>Time stamp in milliseconds from where the part is starting</td>
            </tr>
            <tr>
              <td>
                <code>description</code>
                <div className="required-badge">[required]</div>
              </td>
              <td><code>string</code></td>
              <td>-</td>
              <td>Label that will appear on seeking tooltip</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}; 