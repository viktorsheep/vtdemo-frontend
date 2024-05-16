<script
  lang="ts"
  setup
>
  // uses
  const u = {
    route: useRoute()
  }

  // stores
  const s = {
    contact: useContactStore()
  }

  // datas
  const d = reactive({
    form: {
      name: null,
      nickname: null,
      location: null,
      gender: null,
      age: null,
      baptism_date: null,
      current_prayer_request: null
    },
    saveTypeText: 'Add',
    genders: [
      { label: 'Male', value: 'male' },
      { label: 'Female', value: 'female' }
    ]
  })

  // methods
  const m = {
    click: {
      async save() {
        d.saveTypeText === 'Add' ?
          s.contact.add(d.form)
          : s.contact.edit(d.form, d.form.id)
      }
    }
  }


  if ('id' in u.route.query) {
    d.saveTypeText = 'Edit'
    d.form = {
      name: null,
      nickname: null,
      location: null,
      gender: null,
      age: null,
      baptism_date: null,
      current_prayer_request: null
    }

    const id = parseInt(u.route.query.id + '')
    s.contact.view(id)
    console.log(s.contact.contact)
    d.form = s.contact.contact
  }
</script>

<template>
  <n-space
    :size="10"
    vertical
  >
    <div>
      <ButtonBack />
    </div>

    <n-grid :cols="6">
      <n-gi>

      </n-gi>

      <n-gi :span="4">
        <n-card size="small">
          <h3>{{ d.saveTypeText }} Contact</h3>

          <n-space
            :size="10"
            vertical
          >
            <div>
              <n-input
                v-model:value="d.form.name"
                placeholder="Name"
              />
            </div>
            <div>
              <n-input
                v-model:value="d.form.nickname"
                placeholder="Nick Name"
              />
            </div>
            <div>
              <n-input
                v-model:value="d.form.location"
                placeholder="Location"
              />
            </div>
            <div>
              <n-radio-group
                v-model:value="d.form.gender"
                name="genderRadioGroup"
              >
                <n-space>
                  <n-radio
                    v-for="gender in d.genders"
                    :key="gender.value"
                    :value="gender.value"
                    :label="gender.label"
                  />
                </n-space>
              </n-radio-group>
            </div>
            <div>
              <n-input
                v-model:value="d.form.age"
                placeholder="Age"
              />
            </div>
            <div>
              <n-date-picker
                v-model:value="d.form.baptism_date"
                v-model:formatted-value="d.form.baptism_date"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="Baptism Date"
              />
            </div>
            <div>
              <n-input
                v-model:value="d.form.current_prayer_request"
                type="textarea"
                placeholder="Current Prayer Request"
              />
            </div>

            <div style="text-align: center;">
              <n-button
                type="success"
                @click="m.click.save()"
              >
                {{ d.saveTypeText }}
              </n-button>
            </div>
          </n-space>
        </n-card>
      </n-gi>

      <n-gi>
      </n-gi>
    </n-grid>
  </n-space>
</template>

<style
  lang="scss"
  scoped
></style>
