import { ref } from 'vue'


interface Item {
  value: string;
  label: string;
}

interface Items {
  categories: Item[];
  subcategories: {
    [category: string]: Item[];
  };
  prompts: {
    [category: string]: {
      [subcategory: string]: Item[];
    };
  };
}


export const useGPT = () => {
  const category = ref('');
  const subcategory = ref('');
  const dateTime = ref('');
  const title = ref('');
  
  
  const trendsGPT = ref([
    'Featured',
    'Academic',
    'Marketing',
    'Software'
  ])

  const itemsGPT: Items = {
    categories: [
      { value: 'web', label: 'Web' },
      { value: 'shop', label: 'Shop' },
      { value: 'seo', label: 'SEO' },
      { value: 'rrss', label: 'RRSS' },
    ],
    subcategories: {
      web: [
        { value: 'html', label: 'HTML' },
        { value: 'css', label: 'CSS' },
      ],
      shop: [
        { value: 'woocommerce', label: 'WooCommerce' },
      ],
      seo: [
        { value: 'onpage', label: 'On-page SEO' },
        { value: 'offpage', label: 'Off-page SEO' },
      ],
      rrss: [
        { value: 'facebook', label: 'Facebook' },
        { value: 'twitter', label: 'Twitter' },
      ],
    },
    prompts: {
      web: {
        html: [
          { value: 'meta', label: 'Meta Tags' },
          { value: 'headings', label: 'Headings' },
        ],
        css: [
          { value: 'selectors', label: 'Selectors' },
          { value: 'box-model', label: 'Box Model' },
        ],
      },
      shop: {
        woocommerce: [
          { value: 'cart', label: 'Cart' },
          { value: 'checkout', label: 'Checkout' },
        ],
      },
      seo: {
        onpage: [
          { value: 'keyword-research', label: 'Keyword Research' },
          { value: 'content-optimization', label: 'Content Optimization' },
        ],
        offpage: [
          { value: 'backlinks', label: 'Backlinks' },
          { value: 'social-media', label: 'Social Media' },
        ],
      },
      rrss: {
        facebook: [
          { value: 'ads', label: 'Ads' },
          { value: 'analytics', label: ''}
        ]
      }
    }
  }
  

  const business = ref({
    id: "",
    image: "",
    title: "Therapist-Counselor - Dr. Harmony v1",
    description: "Lorem ipsum dolor description",
    user_id: "",
    phone: "",
    category: ['Microsoft','Apple','Gmail'],
    status: 200,
    address: {
      country: "España",
      province: "",
      city: "",
      zip: "",
      line: "",
    }
  })
  

  const dataGPT = ref([{
   downloaded: '120',
   title: 'Saas Startup',
   description: 'lorem ipsum dolor et epsum',
   author: '@ancientbeast',
   input: 'I have a AI bot',
   output: 'Output AI prompt'
  }])


  return {
    category,
    subcategory,
    dateTime,
    title,

    trendsGPT,
    itemsGPT,
    dataGPT,
    business
  }
}







