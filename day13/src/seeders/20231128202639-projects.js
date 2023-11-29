'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
  
      await queryInterface.bulkInsert('projects', [{
        name: 'projek1',
        star_date:'12/12/12',
        end_date:'20/20/23',
        pesan:'hallo word',
        node_js:true,
        next_Js:true,
        react_Js:true,
        typescript:true,
      }], {});
    
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
