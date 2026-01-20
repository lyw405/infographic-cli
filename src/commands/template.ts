import { getTemplates } from '@antv/infographic';
import { info } from '../utils/error.js';

export async function templateCommand(): Promise<void> {
  const templates = getTemplates();
  info(`Available templates (${templates.length}):\n`);
  for (const templateName of templates) {
    console.log(`  • ${templateName}`);
  }
  console.log('');
  console.log('📖 Visit https://github.com/antvis/Infographic to see template previews and examples');
}
