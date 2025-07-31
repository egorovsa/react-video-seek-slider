export const ApiTable: React.FC = () => {
  return (
    <div className="api-table">
      <table>
        <thead>
          <tr>
            <th>Property</th>
            <th>Type</th>
            <th>Required</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>max</code></td>
            <td><code>number</code></td>
            <td>✅</td>
            <td>Maximum time in milliseconds</td>
          </tr>
          <tr>
            <td><code>currentTime</code></td>
            <td><code>number</code></td>
            <td>✅</td>
            <td>Current time in milliseconds</td>
          </tr>
          <tr>
            <td><code>onChange</code></td>
            <td><code>(time: number, offsetTime: number) =&gt; void</code></td>
            <td>✅</td>
            <td>Callback when time changes</td>
          </tr>
          <tr>
            <td><code>bufferTime</code></td>
            <td><code>number</code></td>
            <td>❌</td>
            <td>Buffer time in milliseconds</td>
          </tr>
          <tr>
            <td><code>timeCodes</code></td>
            <td><code>TimeCode[]</code></td>
            <td>❌</td>
            <td>Array of time codes</td>
          </tr>
          <tr>
            <td><code>getPreviewScreenUrl</code></td>
            <td><code>(hoverTime: number) =&gt; string</code></td>
            <td>❌</td>
            <td>Function to get preview URL</td>
          </tr>
          <tr>
            <td><code>hideThumbTooltip</code></td>
            <td><code>boolean</code></td>
            <td>❌</td>
            <td>Hide the tooltip on thumb hover</td>
          </tr>
          <tr>
            <td><code>limitTimeTooltipBySides</code></td>
            <td><code>boolean</code></td>
            <td>❌</td>
            <td>Limit tooltip position by track sides</td>
          </tr>
          <tr>
            <td><code>secondsPrefix</code></td>
            <td><code>string</code></td>
            <td>❌</td>
            <td>Prefix for seconds display</td>
          </tr>
          <tr>
            <td><code>minutesPrefix</code></td>
            <td><code>string</code></td>
            <td>❌</td>
            <td>Prefix for minutes display</td>
          </tr>
          <tr>
            <td><code>offset</code></td>
            <td><code>number</code></td>
            <td>❌</td>
            <td>Time offset in milliseconds</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}; 