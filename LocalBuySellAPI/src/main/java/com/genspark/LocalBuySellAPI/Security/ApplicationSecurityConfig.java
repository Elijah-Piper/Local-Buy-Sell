package com.genspark.LocalBuySellAPI.Security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class ApplicationSecurityConfig {

    private final PasswordEncoder passwordEncoder;

    @Autowired
    public ApplicationSecurityConfig(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }


    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
//                .csrf().csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
//                .and()  // TODO : Once backend security is integrated, enable and implement xsrf token into frontend + remove .csrf().disable()
                .csrf().disable()
                .authorizeHttpRequests()
//                .antMatchers("/account/index", "/listing/index", "/image/index").permitAll()
                .antMatchers("/listing/**").permitAll()
                .antMatchers("/account/**").permitAll()
                .antMatchers("/image/**").permitAll()
//                .antMatchers("/account/create", "/listing/create/*", "/image/createprofilepicture/*", "image/addlistingimage/*").permitAll()
//                .antMatchers("/account/edit/*", "/listing/edit/*").permitAll()
//                .antMatchers("/account/delete/*", "/listing/delete/*", "/image/delete/*").permitAll()
//                .antMatchers("/account/all").hasRole(ApplicationUserRole.ADMIN.name())
                .anyRequest()
                .authenticated()
                .and()
                .httpBasic();
//                .formLogin()
//                .and()
//                .rememberMe() // Defaults to 2 weeks
//                .and()
//                .logout()
//                .logoutUrl("/logout")
//                .clearAuthentication(true)
//                .invalidateHttpSession(true)
//                .deleteCookies("JSESSIONID", "remember-me");
        return http.build();
    }

    @Bean
    protected UserDetailsService userDetailsService() {
        UserDetails testUser = User.builder()
                .username("testuser")
                .password(passwordEncoder.encode("password"))
                .roles(ApplicationUserRole.USER.name()) // ROLE_USER
                .build();

        UserDetails admin = User.builder()
                .username("admin")
                .password(passwordEncoder.encode("admin"))
                .roles(ApplicationUserRole.ADMIN.name())
                .build();

        return new InMemoryUserDetailsManager(testUser, admin);
    }
}
