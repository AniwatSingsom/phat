'use client';

import React, { useEffect, useRef, useState } from 'react';

interface ProfileProps {
  name: string;
  age: string;
  education: string;
  interests: string;
  motto: string;
  profileImage: string;
  backgroundVideo: string;
  backgroundMusic: string;
}

interface SocialLink {
  platform: string;
  url: string;
  ariaLabel: string;
}

export default function ProfilePage({
  name,
  age,
  education,
  interests,
  motto,
  profileImage,
  backgroundVideo,
  backgroundMusic,
}: ProfileProps) {
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const socialLinks: SocialLink[] = [
    {
      platform: 'twitter',
      url: 'https://x.com/kakachas88899',
      ariaLabel: 'Visit X/Twitter Profile'
    },
    {
      platform: 'facebook',
      url: 'https://www.facebook.com/profile.php?id=100080776863449',
      ariaLabel: 'Visit Facebook Profile'
    },
    {
      platform: 'instagram',
      url: 'https://www.instagram.com/kakachas_',
      ariaLabel: 'Visit Instagram Profile'
    },
    {
      platform: 'telegram',
      url: 'https://t.me/+oJouZqdLod9mZmY9',
      ariaLabel: 'Join Telegram Group'
    }
  ];

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isMusicPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(error => {
          console.log("Playback was prevented:", error);
        });
      }
      setIsMusicPlaying(!isMusicPlaying);
    }
  };

  useEffect(() => {
    const handleClick = () => {
      if (audioRef.current && !isMusicPlaying) {
        audioRef.current.play().catch(() => {});
      }
    };

    document.body.addEventListener('click', handleClick);
    return () => document.body.removeEventListener('click', handleClick);
  }, [isMusicPlaying]);

  return (
    <div className="min-h-screen p-5 flex justify-center items-center relative overflow-hidden text-white font-kanit">
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="fixed right-0 bottom-0 min-w-full min-h-full w-auto h-auto -z-10 object-cover"
      >
        <source src={backgroundVideo} type="video/mp4" />
      </video>
      <div className="fixed inset-0 bg-black/30 -z-10" />
      
      {/* Background Music */}
      <audio ref={audioRef} loop>
        <source src={backgroundMusic} type="audio/mpeg" />
      </audio>

      {/* Music Control Button */}
      <button
        className="fixed bottom-5 right-5 bg-white/10 backdrop-blur-sm p-3 rounded-full cursor-pointer transition-all duration-300 hover:scale-110 hover:bg-white/20 z-50"
        onClick={toggleMusic}
        aria-label={isMusicPlaying ? "Pause music" : "Play music"}
      >
        <img
          src={`data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3E%3Cpath d='${isMusicPlaying ? 
            'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z' :
            'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z'}'/%3E%3C/svg%3E`}
          alt={isMusicPlaying ? "Pause" : "Play"}
          className="w-8 h-8"
        />
      </button>

      {/* Main Content */}
      <div className="max-w-[1200px] w-full mx-auto p-8 bg-black/30 rounded-2xl backdrop-blur-sm shadow-lg z-10">
        <div className="flex flex-col md:flex-row gap-10 items-start mb-10">
          {/* Profile Image */}
          <div className="w-[300px] h-[300px] flex-shrink-0 mx-auto md:mx-0">
            <img
              src={profileImage}
              alt="Profile Picture"
              className="w-full h-full rounded-full object-cover border-4 border-white/20 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_25px_rgba(255,255,255,0.2)]"
            />
          </div>
          
          {/* Profile Information */}
          <div className="flex-grow">
            <div className="text-left">
              <h1 className="text-4xl font-semibold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                ຂໍ້ມູນຂອງຂ້ອຍ
              </h1>
              <div className="text-xl leading-relaxed text-white space-y-2">
                <p><span className="opacity-80">ຊື່ :</span> {name}</p>
                <p><span className="opacity-80">ອາຍູ :</span> {age}</p>
                <p><span className="opacity-80">ການສືກສາ :</span> {education}</p>
                <p><span className="opacity-80">ສຶ່ງທີ່ທີ່ມັກ :</span> {interests}</p>
                <p><span className="opacity-80">ຄະຕິປະຈຳໃຈ :</span> {motto}</p>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-5 mt-8 flex-wrap">
              {socialLinks.map(({ platform, url, ariaLabel }) => (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-white/20"
                  aria-label={ariaLabel}
                >
                  <img
                    src={`data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='${getSocialIcon(platform)}'/%3E%3C/svg%3E`}
                    alt={platform}
                    className="w-5 h-5 brightness-0 invert"
                  />
                </a>
              ))}
            </div>
            
            {/* Spotify Embed */}
            <div className="w-full max-w-[350px] my-5">
              <iframe
                style={{ borderRadius: '12px' }}
                src="https://open.spotify.com/embed/track/3dSIHREYh7yDmVrB5mX65j?utm_source=generator"
                className="w-full h-[152px] rounded-xl border-none shadow-lg"
                frameBorder="0"
                allowFullScreen
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper function for social icons
const getSocialIcon = (platform: string): string => {
  const icons = {
    telegram: 'M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.223-.548.223l.188-2.623 4.823-4.35c.192-.18-.075-.277-.297-.098l-5.935 3.733-2.532-.792c-.55-.172-.56-.547.114-.81l9.868-3.8c.457-.172.856.106.82.644z',
    facebook: 'M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm3 8h-1.35c-.538 0-.65.221-.65.778V10h2l-.209 2H13v7h-3v-7H8v-2h2V7.692C10 5.923 10.931 5 13.029 5H15v3z',
    twitter: 'M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm6.066 9.645c.183 4.04-2.83 8.544-8.164 8.544A8.127 8.127 0 0 1 5.5 16.898a5.778 5.778 0 0 0 4.252-1.189 2.879 2.879 0 0 1-2.684-1.995 2.88 2.88 0 0 0 1.298-.049c-1.381-.278-2.335-1.522-2.304-2.853.388.215.83.344 1.301.359a2.877 2.877 0 0 1-.889-3.835 8.153 8.153 0 0 0 5.92 3.001 2.876 2.876 0 0 1 4.895-2.62 5.73 5.73 0 0 0 1.824-.697 2.884 2.884 0 0 1-1.263 1.589 5.73 5.73 0 0 0 1.649-.453 5.765 5.765 0 0 1-1.433 1.489z',
    instagram: 'M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.897 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.897-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z'
  };
  return icons[platform as keyof typeof icons] || '';
};