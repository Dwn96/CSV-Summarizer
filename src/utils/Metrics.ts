class Metrics {
  static logMetrics(startTime:number, endTime:number, rows:number) {
    const msDifference = endTime - startTime;
    console.log(`Processed ${rows} rows in ${msDifference} ms`);
  }
}

export default Metrics;