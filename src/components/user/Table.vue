<template>
  <v-content class="userTable">
    <v-card>
      <v-card-title>
        {{ title }}
        <v-spacer></v-spacer>
        <v-text-field
          v-if="search"
          v-model="localSearch"
          append-icon="mdi-search"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-card-text v-if="!items"><Loading /></v-card-text>
      <v-data-table
        v-if="items"
        :headers="headers"
        :items="items"
        :search="localSearch"
      >
        <template v-slot:item.action="{ item }">
          <v-menu bottom offset-y>
            <template v-slot:activator="{ on }">
              <v-icon class="action" v-on="on">mdi-pencil</v-icon>
            </template>
            <v-list>
              <v-list-item @click="editAccount(item.user_id)">
                <v-list-item-title>{{ $_('EDIT_ACCOUNT') }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </template>
      </v-data-table>
    </v-card>
  </v-content>
</template>

<script>
  import Loading from "@/handlers/utils/Loading";
  import UserInfos from '@/components/user/Infos';
  
  export default {
    name: 'UserTable',
    components: {
      Loading
    },
    props: {
      items: Array,
      search: Function,
      refresh: Function
    },
    data: () => ({
      title: '',
      headers: [
        {
          text: 'Email',
          align: 'left',
          sortable: false,
          value: 'email',
        },
        { text: 'Phone Number', value: 'phone_number' },
        { text: 'First name', value: 'first_name' },
        { text: 'Last name', value: 'last_name' },
        { text: 'Is verified', value: 'is_verified' },
        { text: 'Is admin', value: 'is_admin' },
        { text: 'Action', value: 'action' },
      ],
      localSearch: null,
    }),
    created() {
      this.title = this.$_('USERS_LIST');
    },
    methods: {
      async editAccount(user_id) {
        const modal = this.$sModal.open(UserInfos);
        const { user } = await this.$sModels.users.retrieveUserById(user_id);
        modal.setParams(user);
        modal.on('close', () => this.refresh());
      }
    },
    watch: {
      localSearch() {
        this.search(this.localSearch);
      }
    }
  };
</script>

<style scoped>
  /deep/ div.v-card__title, /deep/ div.v-data-footer {
    background-color: #ee8d8d !important;
    color: #FFF;
  }
  /deep/ i.v-icon.action {
    cursor: pointer;
  }
</style>
