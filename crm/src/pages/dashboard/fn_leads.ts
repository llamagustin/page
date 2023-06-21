import axios from "axios";


import logo_web from '@/assets/images/services/blue.png'
import logo_ecommerce from '@/assets/images/services/green.png'
import logo_seo from '@/assets/images/services/yellow.png'
import logo_rrss from '@/assets/images/services/red.png'
import logo_office from '@/assets/images/services/violet.png'
import logo_crm from '@/assets/images/services/orange.png'

import aeIcon from '@/assets/images/icons/payments/ae-icon.png'
import mastercardIcon from '@/assets/images/icons/payments/mastercard-icon.png'
import visaIcon from '@/assets/images/icons/payments/visa-icon.png'

import avatar1 from '@/assets/images/icons/brands/bootstrap-logo.png'

interface Transition {
  cardImg: string
  lastDigit: string
  cardType: string
  sentDate: string
  status: keyof Status
  trend: string
}

const axiosIns = axios.create({
  baseURL: "https://api.aythen.com",
  withCredentials: false,
  headers: { 'Content-Type': 'application/json' }
});

export const useDashboardLeads = async () => {
  
  var result = await axiosIns.get('/dashboard/lead').then( res => res.data)
  

  const leadsActive = {
    name: result.leadsActive.name,
    total: result.leadsActive?.total || 0
  }

  
  const simpleStatisticsDemoCards = [
    {
      icon: 'tabler-currency-dollar',
      color: 'success',
      title: 'Beneficio total',
      subTitle: 'Último mes',
      stat: result.simpleStatisticsDemoCards?.stat || '0.00€'
    }
  ]
  
  const leadsRevenueDiary_series = {
    total: result.leadsRevenueDiary_series?.total || '0.00€',
    rate: result.leadsRevenueDiary_series?.rate || '0%',
    series: [{
      // name: 'Hello',
      data: result.leadsRevenueDiary_series?.data || [0, 0, 0, 0, 0, 0, 0, 0, 0]
    }]
  }
  
  
  
  const leadsServicesStates_series = [
    {
      avatarImg: logo_web,
      title: 'Web',
      stats:  result.leadsServicesStates_series?.web || '0',
      progress: 'secondary',
    },
    {
      avatarImg: logo_ecommerce,
      title: 'Shop',
      stats:  result.leadsServicesStates_series?.shop || '0',
      progress: 'success',
    },
    {
      avatarImg: logo_seo,
      title: 'SEO',
      stats:  result.leadsServicesStates_series?.seo || '0',
      progress: 'secondary',
    },
    {
      avatarImg: logo_rrss,
      title: 'RRSS',
      stats: result.leadsServicesStates_series?.rrss || '0',
      progress: 'success',
    },
    {
      avatarImg: logo_office,
      title: 'Office',
      stats: result.leadsServicesStates_series?.office || '0',
      progress: 'secondary',
    },
    {
      avatarImg: logo_crm,
      title: 'CRM',
      stats: result.leadsServicesStates_series?.crm || '0',
      progress: 'success',
    }
  ]
  
  
  const leadsServices_series = [{
    title: 'Web',
    icon: 'tabler-shopping-cart',
    data: result.leadsServices_series?.web || [0, 0, 0, 0, 0, 0, 0, 0, 0]
  },{
    title: 'eCommerce',
    icon: 'tabler-chart-bar',
    data: result.leadsServices_series?.shop || [0, 0, 0, 0, 0, 0, 0, 0, 0]
  },{
    title: 'SEO',
    icon: 'tabler-chart-pie-2',
    data: result.leadsServices_series?.seo || [0, 0, 0, 0, 0, 0, 0, 0, 0]
  },{
    title: 'RRSS',
    icon: 'tabler-chart-pie-2',
    data: result.leadsServices_series?.rrss || [0, 0, 0, 0, 0, 0, 0, 0, 0]
  },{
    title: 'Office',
    icon: 'tabler-shopping-cart',
    data: result.leadsServices_series?.office || [0, 0, 0, 0, 0, 0, 0, 0, 0]
  },{
    title: 'CRM',
    icon: 'tabler-shopping-cart',
    data: result.leadsServices_series?.crm || [0, 0, 0, 0, 0, 0, 0, 0, 0]
  }]
  
  const leadsAnalyticsSales_series = {
      category: ['WEB', 'SHOP', 'SEO', 'RRSS', 'CRM', 'OFFICE'],
      series: [{
         name: 'Total',
         data: result.leadsAnalyticsSales_series?.total || [0, 0, 0, 0, 0, 0],
       },{
         name: 'Tools',
         data: result.leadsAnalyticsSales_series?.individual || [0, 0, 0, 0, 0, 0],
       }]
  }
  
  
  // const leadsActive_series = result.leadsActive_series || []
  // const leadsActive_series = [
  //   {
  //     avatarImg: avatar1,
  //     title: 'Laravel',
  //     subtitle: 'Ecommerce',
  //     stats: '65',
  //     progressColor: 'error',
  //   },
  //   {
  //     avatarImg: avatar1,
  //     title: 'Figma',
  //     subtitle: 'App UI Kit',
  //     stats: '86',
  //     progressColor: 'primary',
  //   },
  // ]

  const leadsWhitdrawal_series: Transition[] = result.leadsWhitdrawal_series || []
  // const leadsWhitdrawal_series: Transition[] = [
  //   {
  //     cardImg: visaIcon,
  //     lastDigit: '*4230',
  //     cardType: 'Credit',
  //     sentDate: '17 Mar 2022',
  //     status: 'Verified',
  //     trend: '+$1,678',
  //   }
  // ]

  return {
    leadsActive,
    simpleStatisticsDemoCards,
    leadsRevenueDiary_series,
    leadsServices_series,
    leadsAnalyticsSales_series,
    leadsServicesStates_series,
    leadsWhitdrawal_series
    
  }
}






































