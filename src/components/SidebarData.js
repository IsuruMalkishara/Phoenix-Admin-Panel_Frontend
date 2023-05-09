import React from 'react';

export const SidebarData = [
    {
      title: 'Vacancies',
      path: '/vacancy',
      cName: 'nav-text'
    },
    {
      title: 'Employers',
      path: '/employer',
      cName: 'nav-text'
    },
    {
      title: 'Job Seekers',
      path: '/jobseeker',
      cName: 'nav-text'
    },
    {
      title: 'Job Categories',
      path: '/category',
      cName: 'nav-text'
    },
    {
      title: 'Job Types',
      path: '/type',
      cName: 'nav-text'
    },
    {
      title: 'Job Modalities',
      path: '/modality',
      cName: 'nav-text'
    },
    
    {
        title: 'Edit Profile',
        path: '/edit',
        cName: 'nav-text'
      },
      
  ];
var adminType=sessionStorage.getItem('userType');

if (adminType === 'Super Admin') {
    SidebarData.splice(6, 0, {
      title: 'Administrators',
      path: '/admin',
      cName: 'nav-text'
    });
  }
  