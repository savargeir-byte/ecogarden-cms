import { client } from '@/sanity/lib/client';
import { groq } from 'next-sanity';

const videoPageQuery = groq`
  *[_type == "videoPage" && _id == "videoPage"][0] {
    title_is, title_en,
    subtitle_is, subtitle_en,
    videos[] {
      title_is, title_en,
      description_is, description_en,
      youtubeUrl,
      "thumbnail": thumbnail.asset->url,
      publishedAt
    }
  }
`;

function getYouTubeId(url: string) {
  if (!url) return null;
  const match = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : null;
}

const SAMPLE_VIDEOS = [
  {
    title_is: 'DLF Sports Events',
    youtubeUrl: 'https://www.youtube.com/watch?v=OUsFt78jt5Y',
    description_is: 'Grasfræ frá DLF — leiðandi framleiðanda á heimsvísu.',
    publishedAt: '',
  },
  {
    title_is: 'Biolan Quick Composter 220eco',
    youtubeUrl: 'https://www.youtube.com/watch?v=H9-KB0_NxvQ',
    description_is: 'Hraðmoltunarker frá BIOLAN — umhverfisvæn lausn fyrir lífrænt úrgang.',
    publishedAt: '',
  },
  {
    title_is: 'DLF Select',
    youtubeUrl: 'https://www.youtube.com/watch?v=9PczyrEQz0M',
    description_is: 'Kynntu þér DLF Select grasfræblöndur.',
    publishedAt: '',
  },
];

export default async function VideoPage() {
  const data = await client.fetch(videoPageQuery).catch(() => null);

  const title    = data?.title_is    ?? 'Kíktu á fróðleg vídeó frá birgjum okkar';
  const subtitle = data?.subtitle_is ?? 'þetta er margt spennandi að gerast';
  const videos   = data?.videos?.length > 0 ? data.videos : SAMPLE_VIDEOS;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-green-900 via-green-800 to-teal-800 py-16 sm:py-20 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url('https://static.wixstatic.com/media/nsplsh_34444c6e594a5145366b77~mv2_d_8256_5504_s_4_2.jpg/v1/fill/w_1470,h_603,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/nsplsh_34444c6e594a5145366b77~mv2_d_8256_5504_s_4_2.jpg')` }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
            🎬 {title}
          </h1>
          <p className="text-lg sm:text-xl text-green-100 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>
      </section>

      {/* Myndskeið grid */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {videos.length === 0 || (videos.length === 1 && !videos[0].youtubeUrl) ? (
            <div className="text-center py-20">
              <p className="text-6xl mb-4">🎬</p>
              <p className="text-gray-500 text-lg">Myndskeið koma bráðlega...</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {videos.map((v: { title_is: string; title_en?: string; description_is?: string; youtubeUrl: string; thumbnail?: string; publishedAt?: string }, i: number) => {
                const ytId = getYouTubeId(v.youtubeUrl);
                const thumb = v.thumbnail || (ytId ? `https://img.youtube.com/vi/${ytId}/hqdefault.jpg` : null);

                return (
                  <div key={i} className="bg-white rounded-2xl shadow-md hover:shadow-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 border border-gray-100 group">
                    {/* Thumbnail / embed */}
                    {ytId ? (
                      <div className="relative aspect-video bg-black">
                        <iframe
                          src={`https://www.youtube.com/embed/${ytId}`}
                          title={v.title_is}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="absolute inset-0 w-full h-full"
                        />
                      </div>
                    ) : thumb ? (
                      <div className="relative aspect-video bg-gray-200 overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={thumb} alt={v.title_is} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="bg-black/50 rounded-full p-4">
                            <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z"/>
                            </svg>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="aspect-video bg-gradient-to-br from-green-100 to-teal-100 flex items-center justify-center">
                        <span className="text-5xl">🎬</span>
                      </div>
                    )}

                    {/* Texti */}
                    <div className="p-4 sm:p-5">
                      <h3 className="font-bold text-gray-900 text-base sm:text-lg mb-1">{v.title_is}</h3>
                      {v.description_is && (
                        <p className="text-gray-500 text-sm leading-relaxed">{v.description_is}</p>
                      )}
                      {v.publishedAt && (
                        <p className="text-xs text-gray-400 mt-2">
                          {new Date(v.publishedAt).toLocaleDateString('is-IS', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
