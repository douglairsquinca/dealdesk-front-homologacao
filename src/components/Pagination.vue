<template>
  <head>
      <!-- ... outros metadados ... -->
      <!--   <link rel="stylesheet" href="https://beehavemarketing.com.br/oda/estilo.css"> --> 
    </head>
  <nav aria-label="Page navigation example">
    <ul class="pagination justify-content-center">
      <li
        class="page-item"
        :class="{ disabled: currentSet === 1 }"
        @click="showLessPages"
      >
        <a class="page-link" href="#" aria-label="Less">
          Anterior
        </a>
      </li>

      <li
        v-for="page in displayedPages"
        :key="page"
        :class="{ current: page === current }"
        @click="changePage(page)"
        class="page-item"
      >
        <a class="page-link" href="#">{{ page }}</a>
      </li>

      <li
        class="page-item"
        :class="{ disabled: currentSet === lastSet }"
        @click="showMorePages"
      >
        <a class="page-link" href="#" aria-label="More">
          Próxima
        </a>
      </li>

      

    </ul>
  </nav>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    total: {
      type: Number,
      required: true
    },
    limit: {
      type: Number,
      default: 10
    },
    currentPage: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      currentSet: 1
    };
  },
  computed: {
    current() {
      return this.currentPage;
    },
    lastPage() {
      return Math.ceil(this.total / this.limit);
    },
    lastSet() {
      return Math.ceil(this.lastPage / 10);
    },
    displayedPages() {
      if (this.lastPage <= 10) {
        // Mostrar todas as páginas
        return Array.from(Array(this.lastPage).keys(), i => i + 1);
      } else {
        // Mostrar as primeiras 10 páginas do conjunto atual
        const startPage = (this.currentSet - 1) * 10 + 1;
        const endPage = Math.min(startPage + 9, this.lastPage);
        const displayedPages = Array.from(
          Array(endPage - startPage + 1).keys(),
          i => startPage + i
        );
        return displayedPages;
      }
    }
  },
  methods: {
    changePage(page) {
      if (page === 1) {
      page = 0;
    }
    if (page !== this.current) {
      this.$emit("change-page", page);
    }
    },
    showMorePages() {
      if (this.currentSet < this.lastSet) {
        this.currentSet++;
      }
    },
    showLessPages() {
      if (this.currentSet > 1) {
        this.currentSet--;
      }
    }
  }
};
</script>