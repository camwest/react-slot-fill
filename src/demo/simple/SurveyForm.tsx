import * as React from 'react';

export default () => (
  <form className="pa4">
    <fieldset id="favorite_movies" className="bn">
      <legend className="fw7 mb2">Favorite Movies</legend>
      <div className="flex items-center mb2">
        <input className="mr2" type="checkbox" id="spacejam" value="spacejam" />
        <label className="lh-copy">Space Jam</label>
      </div>
      <div className="flex items-center mb2">
        <input className="mr2" type="checkbox" id="airbud" value="airbud" />
        <label className="lh-copy">Air Bud</label>
      </div>
      <div className="flex items-center mb2">
        <input className="mr2" type="checkbox" id="hocuspocus" value="hocuspocus" />
        <label className="lh-copy">Hocus Pocus</label>
      </div>
      <div className="flex items-center mb2">
        <input className="mr2" type="checkbox" id="diehard" value="diehard" />
        <label className="lh-copy">Die Hard</label>
      </div>
      <div className="flex items-center mb2">
        <input className="mr2" type="checkbox" id="primer" value="primer" />
        <label className="lh-copy">Primer</label>
      </div>
      <div className="flex items-center mb2">
        <input className="mr2" type="checkbox" id="proxy" value="proxy" />
        <label className="lh-copy">Hudsucker Proxy</label>
      </div>
      <div className="flex items-center mb2">
        <input className="mr2" type="checkbox" id="homealone" value="homealone" />
        <label className="lh-copy">Home Alone</label>
      </div>
    </fieldset>
  </form>
);