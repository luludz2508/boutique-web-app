import ClientLayoutV2 from '../ClientLayoutV2';

export default function TestLayoutV2Page() {
  return (
    <ClientLayoutV2>
      <div className="p-8">
        <h1 className="text-4xl font-serif text-cyphr-mahogany mb-4">Test ClientLayoutV2</h1>
        <p className="text-lg text-cyphr-teal mb-6">
          This is a test page to verify that ClientLayoutV2 is working correctly with the new Cyphr
          color palette.
        </p>

        {/* Color Palette Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-cyphr-sand p-6 rounded-lg border border-cyphr-peach">
            <h3 className="text-xl font-serif text-cyphr-mahogany mb-2">Sand Background</h3>
            <p className="text-cyphr-teal">Neutral balance background</p>
          </div>

          <div className="bg-cyphr-teal p-6 rounded-lg">
            <h3 className="text-xl font-serif text-white mb-2">Teal Accent (Much Darker)</h3>
            <p className="text-cyphr-sand">
              Main accent color - now much darker for strong contrast
            </p>
          </div>

          <div className="bg-cyphr-peach p-6 rounded-lg">
            <h3 className="text-xl font-serif text-cyphr-mahogany mb-2">Peach Warm</h3>
            <p className="text-cyphr-mahogany">Soft warm tone</p>
          </div>

          <div className="bg-cyphr-orange p-6 rounded-lg">
            <h3 className="text-xl font-serif text-white mb-2">Orange Highlight</h3>
            <p className="text-cyphr-sand">Vivid architectural highlight</p>
          </div>

          <div className="bg-cyphr-mahogany p-6 rounded-lg">
            <h3 className="text-xl font-serif text-cyphr-sand mb-2">Mahogany Deep</h3>
            <p className="text-cyphr-peach">Deep grounding tone</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-cyphr-peach">
          <h2 className="text-2xl font-serif text-cyphr-mahogany mb-3">Layout Features</h2>
          <ul className="space-y-2 text-cyphr-teal">
            <li>✅ Accordion navigation on desktop</li>
            <li>✅ Mobile hamburger menu</li>
            <li>✅ Responsive design</li>
            <li>✅ Smooth animations</li>
            <li>✅ Error handling and fallbacks</li>
            <li>✅ Modern architectural color palette</li>
          </ul>
        </div>
      </div>
    </ClientLayoutV2>
  );
}
