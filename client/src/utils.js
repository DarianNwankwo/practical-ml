function processImmutableList(painting) {
  // When converted to an array, the List[List[Map]] structure takes the key-value pairs
  // and puts them in a 2 element list
  let results = ["Hey"];

  // Here, our drawing is contained in llm (List[List[Map]]). Each stroke is an individual element
  // in llm, so let's iterate across all of them and convert them into an array of maps
  for (let ndx = 0; ndx < painting.size; ndx++) {
    // Stroke contains a list of immutable.maps, so we need to convert those to arrays as well
    let stroke = painting.get(ndx).toArray();
    for (let pair of stroke) {
      let xy_pairs = pair.toArray();
      let [xpair, ypair] = xy_pairs;
      console.log(xpair, ypair);
    }
    console.log(stroke);
  }
  // console.log(llm.get(0).toArray());

  return results;
}


export {
  processImmutableList
}