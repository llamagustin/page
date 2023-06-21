<script setup lang="ts">
  export interface Member {
    name: string
    role: string
    picture: string
    logo: string
  }

  export interface TabbedTestimonial {
    title: string
    content: string
    member: Member
  }

  export interface TabbedTestimonialsProps {
    freelancers: TabbedTestimonial[]
    clients: TabbedTestimonial[]
    inverted ? : boolean
  }

  const props = withDefaults(defineProps < TabbedTestimonialsProps > (), {
    freelancers: () => [],
    clients: () => [],
    inverted: false,
  })
</script>

<template>
  <div class="tabbed-testimonials py-6">

    <Tabs slider alignment="centered" :tabs="[
        { label: 'Freelancers', value: 'freelancers', default: true },
        { label: 'Clientes', value: 'clients' },
      ]">
      <template #tab="{selected}">
        <div v-if="selected === 'freelancers'" class="tabbed-grid">
          <div class="columns is-multiline">
            <div v-for="(freelancer, t) in props.freelancers" :key="t" class="column is-6">
              <div class="tabbed-grid-item">
                <Tag :label="$t('freelancercompanyName' + t)" class="mb-4" />
                <Title tag="h3" :size="6" weight="semi">
                  "{{ $t('freelancerCompanyTitle' + t) }}"
                </Title>
                <p class="paragraph rem-90 mb-4">{{ $t('freelancerCompanyContent' + t) }} </p>
                <div class="member">
                  <AvatarSimple :picture="freelancer.member.picture" size="medium" squared />
                  <div class="meta">
                    <Title tag="h3" :size="7" weight="semi" narrow>
                      {{ $t('freelancerMemberName' + t) }}
                    </Title>
                    <p class="paragraph rem-90">{{ $t('freelancerMemberRole' + t) }}</p>
                  </div>
                  <div class="logo">
                    <img :src="freelancer.member.logo" alt="brand logo" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!--Agentes digitalizadores-->
        <div v-if="selected === 'clients'" class="tabbed-grid">
<!--          <pre>
          {{ props }}
          </pre>-->
          <div class="columns is-multiline">
            <div v-for="(client, m) in props.clients" :key="m" class="column is-6">
              <div class="tabbed-grid-item">
                <Tag label="Mentor Stories" class="mb-4" />
                <Title tag="h3" :size="6" weight="semi">
                  "{{ $t('freelancerMentorTitle' + m) }}"
                </Title>
                <p class="paragraph rem-90 mb-4">{{ $t('freelancerMentorContent' + m) }}</p>
                <div class="member">
                  <AvatarSimple :picture="client.member.picture" size="medium" squared />
      
                  <div class="meta">
                    <Title tag="h3" :size="7" weight="semi" narrow>
                      {{ $t('freelancerMentorMemberName' + m) }}
                    </Title>
                    <p class="paragraph rem-90">{{ $t('freelancerMentorMemberRole' + m)}}</p>
                  </div>
                  <div class="logo">
                    <img :src="client.member.logo" alt="brand logo" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </Tabs>
  </div>
</template>

<style scoped lang="scss">
  .tabbed-testimonials {
    max-width: 960px;
    margin: 0 auto;

    :deep(.tabs-wrapper) {
      .tabs {
        max-width: 350px;
        margin-bottom: 3rem;
      }
    }

    .tabbed-grid {
      .tabbed-grid-item {
        background: var(--card-bg-color);
        border: 1px solid var(--card-border-color);
        border-radius: 1rem;
        padding: 2rem;

        > :deep(.title) {
          line-height: 1.4;
        }

        .member {
          display: flex;
          align-items: center;

          :deep(.avatar) {
            img {
              box-shadow: var(--light-box-shadow);
            }
          }

          .meta {
            margin-left: 0.75rem;
          }

          .logo {
            margin-left: auto;

            img {
              display: block;
              width: 100%;
              max-width: 90px;
            }
          }
        }
      }
    }
  }

  .is-dark {
    .tabbed-testimonials {
      .tabbed-grid {
        .tabbed-grid-item {
          .member .logo img {
            filter: invert(1);
          }
        }
      }
    }
  }
</style>
