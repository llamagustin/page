declare module 'vue' {
  export interface GlobalComponents {
    RouterLink: typeof import('vue-router')['RouterLink']
    RouterView: typeof import('vue-router')['RouterView']
    
    
  }
}

/*
declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    HomeHeroF: typeof import('./src/components/web/home/HomeHeroF.vue')['default']
    HomeContentBlockB: typeof import('./src/components/web/home/HomeContentBlockB.vue')['default']
    HomeBoxedFeatures: typeof import('./src/components/web/home/boxed-features-section/HomeBoxedFeatures.vue')['default']
    HomeFeatureBlockB: typeof import('./src/components/web/home/HomeFeatureBlockB.vue')['default']
    HomePopover: typeof import('./src/components/web/home/popover/HomePopover.vue')['default']
    HomeDemoList: typeof import('./src/components/web/home/HomeDemoList.vue')['default']
    HomeDemoFeatures: typeof import('./src/components/web/home/HomeDemoFeatures.vue')['default']
    HomeFeatureBlockH: typeof import('./src/components/web/home/HomeFeatureBlockH.vue')['default']
    HomeDemoComponents: typeof import('./src/components/web/home/HomeDemoComponents.vue')['default']
    HomeDemoChoice: typeof import('./src/components/web/home/HomeDemoChoice.vue')['default']
    
    
    EditorTimelineTitle: typeof import('./src/components/web/editor/EditorTimelineTitle.vue')['default']
    EditorDevWindows: typeof import('./src/components/web/editor/EditorDevWindows.vue')['default']
    EditorTimeline: typeof import('./src/components/web/editor/EditorTimeline.vue')['default']
    EditorDualBoxes: typeof import('./src/components/web/editor/EditorDualBoxes.vue')['default']
    EditorSectionMap: typeof import('./src/components/web/editor/EditorSectionMap.vue')['default']
    
    AppShapes: typeof import('./src/components/web/app/AppShapes.vue')['default']
    AppSideSectionIcons: typeof import('./src/components/web/app/AppSideSectionIcons.vue')['default']
  }
}
*/
export {}
