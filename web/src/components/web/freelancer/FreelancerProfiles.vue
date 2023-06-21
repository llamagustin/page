<script setup lang="ts" >
export interface JobsProfiles { profiles?: []}

const props = withDefaults(defineProps<JobsProfiles>(), { profiles: [] })

</script>
<template>
    <div>
        <h1>Profiles</h1>
        <div v-for="p in props.profiles" >
            
            {{p.fullname}}
        </div>
        
    </div>
</template>