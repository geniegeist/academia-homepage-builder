import { unified } from 'unified';
import remarkMath from 'remark-math';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeMathjax from 'rehype-mathjax';
import remarkParse from 'remark-parse/lib';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify/lib';

function useWebsiteBuilder() {
  const build = (markdown: string, completion: (html: string) => void) => {
    unified()
      .use(remarkParse)
      .use(remarkGfm)
      .use(remarkMath)
      .use(remarkRehype)
      .use(rehypeMathjax)
      .use(rehypeSlug)
      .use(rehypeStringify)
      .process(markdown)
      .then(({ value }) => {
        completion(value as string);
      });
  };

  return [build];
}

export default useWebsiteBuilder;
