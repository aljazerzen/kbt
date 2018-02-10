import * as ejs from 'ejs';
import * as fs from 'fs';
import { promisify } from 'util';

export async function render(...dataSets: number[][][]) {
  const data = {
    datasets: dataSets.map(d =>
      '[' + d.map(t => `{ x: ${t[0]}, y: ${t[1]} }`).join(',') + ']'
    )
  };

  const renderFile = promisify(ejs.renderFile) as (a: string, b: any) => Promise<string>;
  const rendered = await renderFile('./views/graph.ejs', data);

  await promisify(fs.writeFile)('./out/graph.html', rendered);
}
