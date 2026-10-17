import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'in.chalughadamodi.app',
  appName: 'चालू घडामोडी',
  webDir: 'public',
  server: {
    // Points native mobile webview to live Cloudflare production web app
    url: 'https://chalughadamodi.in',
    cleartext: false,
    androidScheme: 'https',
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      launchAutoHide: true,
      backgroundColor: '#0A2540',
      androidSplashResourceName: 'splash',
      androidScaleType: 'CENTER_CROP',
      showSpinner: false,
    },
    StatusBar: {
      style: 'DARK',
      backgroundColor: '#0A2540',
    },
  },
};

export default config;
