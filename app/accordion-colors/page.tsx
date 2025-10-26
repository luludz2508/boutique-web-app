import ClientLayoutV2 from '../ClientLayoutV2';

export default function AccordionColorPreview() {
  return (
    <ClientLayoutV2>
      <div className="p-8">
        <h1 className="text-4xl font-serif text-cyphr-mahogany mb-6">Accordion Color Mapping</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Color Mapping Reference */}
          <div className="bg-white p-6 rounded-lg border border-cyphr-peach">
            <h2 className="text-2xl font-serif text-cyphr-mahogany mb-4">Navigation Sections</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded bg-cyphr-sand border border-cyphr-peach"></div>
                <div>
                  <p className="font-semibold text-cyphr-mahogany">Home</p>
                  <p className="text-sm text-cyphr-teal">bg-neutral-50 → cyphr-sand</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded bg-cyphr-teal"></div>
                <div>
                  <p className="font-semibold text-white">Collection</p>
                  <p className="text-sm text-cyphr-sand">bg-brown-600 → cyphr-teal (much darker)</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded bg-cyphr-peach"></div>
                <div>
                  <p className="font-semibold text-cyphr-mahogany">Services</p>
                  <p className="text-sm text-cyphr-teal">bg-accent-400 → cyphr-peach</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded bg-cyphr-orange"></div>
                <div>
                  <p className="font-semibold text-white">Gallery</p>
                  <p className="text-sm text-cyphr-sand">bg-brown-800 → cyphr-orange</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded bg-cyphr-mahogany"></div>
                <div>
                  <p className="font-semibold text-cyphr-sand">Atelier</p>
                  <p className="text-sm text-cyphr-peach">bg-neutral-100 → cyphr-mahogany</p>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Preview */}
          <div className="bg-white p-6 rounded-lg border border-cyphr-peach">
            <h2 className="text-2xl font-serif text-cyphr-mahogany mb-4">Interactive Elements</h2>
            <div className="space-y-4">
              <div className="p-4 bg-cyphr-sand rounded-lg border border-cyphr-peach hover:bg-cyphr-peach/20 transition-colors cursor-pointer">
                <p className="text-cyphr-mahogany font-semibold">Hover Effect</p>
                <p className="text-sm text-cyphr-teal">bg-cyphr-peach/20</p>
              </div>

              <div className="p-4 bg-cyphr-teal rounded-lg text-white">
                <p className="font-semibold">Active State</p>
                <p className="text-sm text-cyphr-sand">84% width expansion</p>
              </div>

              <div className="p-4 bg-cyphr-mahogany rounded-lg text-cyphr-sand">
                <p className="font-semibold">Collapsed State</p>
                <p className="text-sm text-cyphr-peach">4% width with vertical text</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-cyphr-sand p-6 rounded-lg border border-cyphr-peach">
          <h2 className="text-2xl font-serif text-cyphr-mahogany mb-3">Color Palette Benefits</h2>
          <ul className="space-y-2 text-cyphr-teal">
            <li>🎨 Modern architectural aesthetic</li>
            <li>🌊 Cool teal provides visual contrast</li>
            <li>🍑 Warm peach creates inviting interactions</li>
            <li>🏖️ Sand background ensures readability</li>
            <li>🔥 Orange highlights call-to-action elements</li>
            <li>🍂 Mahogany provides strong text contrast</li>
          </ul>
        </div>
      </div>
    </ClientLayoutV2>
  );
}
