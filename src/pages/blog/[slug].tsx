import type { GetStaticPaths, GetStaticProps } from 'next';
import dynamic from 'next/dynamic';
import '../../polyfills';
import { SeoContainer } from '../../components/SeoContainer';
import { BLOG_POSTS, getBlogPost, type BlogPostContent } from '../../content/blog';

const App = dynamic(() => import('../../App'), {
  ssr: false,
  loading: () => (
    <div className="flex min-h-screen items-center justify-center bg-black text-blue-400">
      <div className="animate-pulse font-medium">Loading Token Club Guide...</div>
    </div>
  ),
});

interface BlogPostPageProps {
  post: BlogPostContent;
}

export default function BlogPostPage({ post }: BlogPostPageProps) {
  if (!post) {
    return null;
  }

  const features = post.steps.map((step) => ({
    title: `Step ${step.number}: ${step.title}`,
    description: step.content,
  }));

  const faqs = post.troubleshooting.problems.map((prob) => ({
    question: prob.problem,
    answer: prob.solution,
  }));

  return (
    <SeoContainer
      title={`${post.title} — Token Club Blog`}
      description={post.metaDescription}
      canonicalPath={`/blog/${post.slug}`}
      h1={post.title}
      leadText={post.directAnswer}
      features={features}
      faqs={faqs}
    >
      <App initialRoute={`/blog/${post.slug}`} />
    </SeoContainer>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = Object.keys(BLOG_POSTS).map((slug) => ({
    params: { slug },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<BlogPostPageProps> = async ({ params }) => {
  const slug = params?.slug as string;
  const post = getBlogPost(slug);

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post,
    },
  };
};
