-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 12, 2024 at 12:00 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.1.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `laravel`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `category_name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `image` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `category_name`, `created_at`, `updated_at`, `image`) VALUES
(1, 'asian', NULL, NULL, 'https://static.vecteezy.com/system/resources/previews/015/511/644/non_2x/asian-food-banner-asian-cuisine-with-various-dishes-illustration-vector.jpg'),
(2, 'mexican', NULL, NULL, 'https://images.twinkl.co.uk/tw1n/image/private/t_630/image_repo/0e/50/T-T-9683-Mexican-Food-Display-Banner.jpg'),
(3, 'serbian', NULL, NULL, 'https://miro.medium.com/v2/resize:fit:1400/0*KIjv0uORihJ39L8v.png'),
(4, 'american', NULL, NULL, 'https://png.pngtree.com/png-clipart/20210516/original/pngtree-graffiti-style-us-fast-food-template-png-image_6284868.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `items`
--

CREATE TABLE `items` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `meal_description` text NOT NULL,
  `price` double(8,2) NOT NULL,
  `image` text NOT NULL,
  `amount` int(11) NOT NULL DEFAULT 0,
  `restaurant_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `items`
--

INSERT INTO `items` (`id`, `name`, `meal_description`, `price`, `image`, `amount`, `restaurant_id`, `created_at`, `updated_at`) VALUES
(1, 'Mešano meso', 'kebabs, leskovac uštipak, chicken fillet, smoked sausage, sausage, french fries, onion /450g', 990.00, 'https://static.alideda.com/wp-content/uploads/2022/05/mesano-meso-1kg.jpg', 0, 1, NULL, NULL),
(2, 'Leskovački uštipci', 'cheese, bacon, onion, garlic, ham, crushed pepper, French fries', 810.00, 'https://cdn.bestfood.rs/w/960/h/720/media/foods/Ustipci1.png', 0, 1, NULL, NULL),
(3, 'Užički medaljoni', 'pork fillet, mushrooms, bacon, potatoes, cream', 950.00, 'https://mrd-cdn.fra1.digitaloceanspaces.com/merchant/photo/_5m814cxobjujp7c_1639914805741_uzicki%20medaljoni.png', 0, 1, NULL, NULL),
(4, 'Grilovani losos', 'salmon, spinach, potatoes', 2700.00, 'https://www.canzona.net/images/glavna-jela/riba/Canzona_040418_054.jpg', 0, 1, NULL, NULL),
(5, 'Quesadilla Lo Major', 'tortilla, minced meat, cheddar, smoked cheese, pico de gallo, Zapata sauce', 500.00, 'https://mrd-cdn.fra1.digitaloceanspaces.com/merchant/photo/_vmgolvb0bjhi5hs_1640370840967_cesadilla%20lo%20major.png', 0, 2, '2024-02-07 10:25:15', '2024-02-09 20:35:36'),
(6, 'Burrito Zapata', 'spicy meat mix, iceberg, pico de gallo, smoked sausage, potatoes, chilli tex mex salsa, mixed salad', 1000.00, 'https://www.zapatabeograd.rs/burrito%20zapata1.jpg', 0, 2, '2024-02-07 10:28:15', '2024-02-07 10:28:15'),
(7, 'Chimichanga Con Carne', 'beef rolls on a base of rice, smoked sausage, spinach with garlic, topped with cheddar sauce, mixed salad', 1120.00, 'https://www.zapatabeograd.rs/chimichanga%20con%20carne1.jpg', 0, 2, '2024-02-07 10:32:19', '2024-02-07 10:32:19'),
(8, 'Chilean Roll', 'chilean sea bass, Mayonnaise, Soy paper', 700.00, 'https://scontent.fbeg6-1.fna.fbcdn.net/v/t1.6435-9/130856951_1983183788486998_2145185560677543242_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=7f8c78&_nc_ohc=-zImjWcjmGcAX85lzNY&_nc_ht=scontent.fbeg6-1.fna&oh=00_AfCN7oY8ia6-WItPVnynCLsc0EPgi8iEloiqICieIPg_lA&oe=65EB3410', 0, 3, '2024-02-07 10:40:42', '2024-02-07 10:40:42'),
(9, 'Sakana rolnica (8 kom)', 'salmon, tuna, Philadelphia cheese, Orange tobiko, Teriyaki sauce', 900.00, 'https://scontent.fbeg6-1.fna.fbcdn.net/v/t1.6435-9/60688729_1486149038190478_3501082985501818880_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=7f8c78&_nc_ohc=6r25hk86ZdYAX896qWo&_nc_ht=scontent.fbeg6-1.fna&oh=00_AfBHbLlveZBLSCHaIwmRmdud6NVTJTr9uhsYlVCaaxWMbg&oe=65EAD190', 0, 3, '2024-02-07 10:42:45', '2024-02-07 10:42:45'),
(10, 'Sticky Toffee Cake', 'warm date cake served in butterscotch sauce and topped with vanilla ice cream and cinnamon sprinkles', 450.00, 'https://www.livewellbakeoften.com/wp-content/uploads/2022/07/Sticky-Toffee-Pudding-9s.jpg', 0, 4, '2024-02-07 10:50:26', '2024-02-07 10:50:26'),
(11, 'Sticky Toffee Cake', 'Topli kolač od urmi poslužen u butterscotch sosu i sa vanila sladoledom i varnicama cimeta', 450.00, 'https://www.livewellbakeoften.com/wp-content/uploads/2022/07/Sticky-Toffee-Pudding-9s.jpg', 0, 4, '2024-02-09 20:29:21', '2024-02-09 20:29:21');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(15, '2014_10_12_000000_create_users_table', 1),
(16, '2014_10_12_100000_create_password_reset_tokens_table', 1),
(17, '2019_08_19_000000_create_failed_jobs_table', 1),
(18, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(19, '2023_12_23_194659_create_restaurants_table', 1),
(20, '2023_12_23_204348_create_categories_table', 1),
(21, '2023_12_23_210728_create_items_table', 1),
(22, '2023_12_23_212625_create_orders_table', 1),
(23, '2023_12_23_213123_create_order_items_table', 1),
(24, '2023_12_23_220308_rename_description_to_meal_description', 1),
(25, '2023_12_23_220750_add_column_to_table_restaurants', 1),
(26, '2023_12_23_221200_delete_column_from_table_orders', 1),
(27, '2023_12_27_013149_create_roles_table', 1),
(28, '2023_12_27_015007_add_password_constraint_to_users_table', 1);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `order_number` varchar(255) NOT NULL,
  `status` enum('pending','processing','completed','decline') NOT NULL DEFAULT 'pending',
  `payment_method` enum('cash_on_delivery') NOT NULL DEFAULT 'cash_on_delivery',
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `restaurant_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `order_number`, `status`, `payment_method`, `user_id`, `restaurant_id`, `created_at`, `updated_at`) VALUES
(1, 'ccaf33f7-6588-4947-8d1f-04c4cb32af9a', 'pending', 'cash_on_delivery', 2, 3, '2024-02-09 13:29:22', '2024-02-12 15:19:54'),
(2, '00afe44f-62ad-47c6-9327-5fc4a4e01153', 'pending', 'cash_on_delivery', 2, 3, '2024-02-09 14:38:27', '2024-02-09 14:38:27'),
(3, 'fcaf5d5d-e3bc-4777-83fd-e6cc2b433647', 'pending', 'cash_on_delivery', 2, 3, '2024-02-09 14:40:16', '2024-02-09 14:40:16'),
(4, '94e53d1e-7101-4452-85b9-7409a2ac6663', 'pending', 'cash_on_delivery', 2, 3, '2024-02-09 14:42:41', '2024-02-09 14:42:41'),
(5, '600fed5e-f9b8-408c-a71f-2276c27cebd1', 'pending', 'cash_on_delivery', 2, 3, '2024-02-09 14:43:01', '2024-02-09 14:43:01'),
(6, 'efca4ee0-d047-4ad9-9db0-55802357d64c', 'pending', 'cash_on_delivery', 2, 1, '2024-02-09 14:44:26', '2024-02-09 14:44:26'),
(7, '4ec29fb2-18fc-45d2-b2c8-99a2fd3d7d51', 'pending', 'cash_on_delivery', 2, 1, '2024-02-09 15:11:21', '2024-02-09 15:11:21'),
(8, '0e714f6f-6374-41bd-af87-e7dfde3c15d4', 'pending', 'cash_on_delivery', 2, 1, '2024-02-09 15:13:07', '2024-02-09 15:13:07'),
(9, '0da13552-70ad-4bb7-95cb-7d12eb0b3e18', 'pending', 'cash_on_delivery', 2, 1, '2024-02-09 15:13:48', '2024-02-09 15:13:48'),
(10, '9ba06719-bd63-46a4-bafd-eb0f2c69b02d', 'pending', 'cash_on_delivery', 2, 3, '2024-02-09 15:14:42', '2024-02-09 15:14:42'),
(11, '474ad190-7454-45ba-8088-3a229e4a40e7', 'pending', 'cash_on_delivery', 2, 2, '2024-02-09 19:16:02', '2024-02-09 19:16:02'),
(12, '8dd50522-ca32-4b02-be69-ed8c8a2f2c93', 'pending', 'cash_on_delivery', 2, 2, '2024-02-10 10:29:11', '2024-02-10 10:29:11'),
(13, '50afc914-5825-49c4-80d2-090bb4d92416', 'pending', 'cash_on_delivery', 5, 1, '2024-02-11 21:39:08', '2024-02-11 21:39:08'),
(14, 'a8997709-7946-4d1c-9eb6-3c6b4a01c48c', 'pending', 'cash_on_delivery', 5, 2, '2024-02-11 21:43:34', '2024-02-11 21:43:34'),
(15, '9c3aa77b-9b37-4ced-b3ba-1c878d6f67c5', 'pending', 'cash_on_delivery', 5, 2, '2024-02-11 21:45:03', '2024-02-11 21:45:03'),
(16, 'd02583c1-880e-4980-bcef-0e160f5316f8', 'pending', 'cash_on_delivery', 7, 3, '2024-02-11 21:55:50', '2024-02-11 21:55:50'),
(17, '70323a74-a877-49fd-96a1-11b06b81a537', 'pending', 'cash_on_delivery', 2, 3, '2024-02-12 13:20:54', '2024-02-12 13:20:54'),
(18, '2799c1da-b3b3-42d1-acdb-908a7c22d583', 'pending', 'cash_on_delivery', 2, 1, '2024-02-12 15:31:51', '2024-02-12 15:31:51');

-- --------------------------------------------------------

--
-- Table structure for table `order_items`
--

CREATE TABLE `order_items` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `quantity` int(11) NOT NULL,
  `item_id` bigint(20) UNSIGNED NOT NULL,
  `order_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `order_items`
--

INSERT INTO `order_items` (`id`, `quantity`, `item_id`, `order_id`, `created_at`, `updated_at`) VALUES
(1, 3, 2, 1, '2024-02-09 13:30:20', '2024-02-09 13:30:20'),
(2, 1, 8, 1, '2024-02-09 13:46:46', '2024-02-09 13:46:46'),
(3, 1, 8, 1, '2024-02-09 13:47:10', '2024-02-09 13:47:10'),
(4, 1, 9, 1, '2024-02-09 13:48:00', '2024-02-09 13:48:00'),
(5, 1, 8, 1, '2024-02-09 13:51:28', '2024-02-09 13:51:28'),
(6, 1, 8, 1, '2024-02-09 14:09:58', '2024-02-09 14:09:58'),
(7, 1, 9, 1, '2024-02-09 14:10:21', '2024-02-09 14:10:21'),
(8, 1, 9, 1, '2024-02-09 14:11:00', '2024-02-09 14:11:00'),
(9, 1, 9, 1, '2024-02-09 14:11:00', '2024-02-09 14:11:00'),
(10, 1, 9, 1, '2024-02-09 14:11:00', '2024-02-09 14:11:00'),
(11, 2, 2, 1, '2024-02-09 14:21:02', '2024-02-09 14:21:02'),
(12, 2, 2, 1, '2024-02-09 14:21:18', '2024-02-09 14:21:18'),
(13, 2, 4, 1, '2024-02-09 14:21:19', '2024-02-09 14:21:19'),
(14, 2, 9, 4, '2024-02-09 14:42:43', '2024-02-09 14:42:43'),
(15, 2, 9, 5, '2024-02-09 14:43:02', '2024-02-09 14:43:02'),
(16, 2, 2, 6, '2024-02-09 14:44:27', '2024-02-09 14:44:27'),
(17, 1, 4, 6, '2024-02-09 14:44:28', '2024-02-09 14:44:28'),
(18, 2, 1, 7, '2024-02-09 15:11:22', '2024-02-09 15:11:22'),
(19, 1, 2, 7, '2024-02-09 15:11:23', '2024-02-09 15:11:23'),
(20, 1, 1, 8, '2024-02-09 15:13:08', '2024-02-09 15:13:08'),
(21, 1, 1, 9, '2024-02-09 15:13:49', '2024-02-09 15:13:49'),
(22, 1, 2, 9, '2024-02-09 15:13:50', '2024-02-09 15:13:50'),
(23, 2, 8, 10, '2024-02-09 15:14:44', '2024-02-09 15:14:44'),
(24, 2, 5, 11, '2024-02-09 19:16:03', '2024-02-09 19:16:03'),
(25, 1, 6, 11, '2024-02-09 19:16:03', '2024-02-09 19:16:03'),
(26, 2, 5, 12, '2024-02-10 10:29:12', '2024-02-10 10:29:12'),
(27, 1, 6, 12, '2024-02-10 10:29:13', '2024-02-10 10:29:13'),
(28, 2, 4, 13, '2024-02-11 21:39:09', '2024-02-11 21:39:09'),
(29, 2, 8, 16, '2024-02-11 21:55:50', '2024-02-11 21:55:50'),
(30, 1, 8, 17, '2024-02-12 13:20:56', '2024-02-12 13:20:56'),
(31, 1, 9, 17, '2024-02-12 13:20:56', '2024-02-12 13:20:56'),
(32, 2, 2, 18, '2024-02-12 15:31:53', '2024-02-12 15:31:53'),
(33, 1, 3, 18, '2024-02-12 15:31:53', '2024-02-12 15:31:53');

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(2, 'App\\Models\\User', 2, 'auth_token', '86ad60f3d991919cc49a65f2c21e2b8ac79cf88f2dcf86b379e4401cc734d843', '[\"*\"]', NULL, NULL, '2024-02-07 18:55:20', '2024-02-07 18:55:20'),
(3, 'App\\Models\\User', 2, 'auth_token', 'e9cab56ebfa29f51bf41832fe6f164f9bd08022428a0890d9a7cc6b1fe9a8300', '[\"*\"]', NULL, NULL, '2024-02-07 21:39:08', '2024-02-07 21:39:08'),
(4, 'App\\Models\\User', 2, 'auth_token', 'e650261747f61375b17acadefa6a8329b0cdc33d7da30c92e1dad24d8c3f57a7', '[\"*\"]', NULL, NULL, '2024-02-07 21:39:11', '2024-02-07 21:39:11'),
(5, 'App\\Models\\User', 2, 'auth_token', '8d3d742889c454a6057f68ab2d2032a14b8999ad629208e65f0e6d31c98b801e', '[\"*\"]', NULL, NULL, '2024-02-07 23:16:13', '2024-02-07 23:16:13'),
(6, 'App\\Models\\User', 2, 'auth_token', 'a5f8417a3ad9e0f61444778fe86490c959bde72f404eefe43cdf6322d0c183e6', '[\"*\"]', NULL, NULL, '2024-02-08 09:16:27', '2024-02-08 09:16:27'),
(7, 'App\\Models\\User', 2, 'auth_token', 'bc42b3e819bfa4373f6416a1508dca3ab934cbe963fecade07945c2e1e5e2ef1', '[\"*\"]', NULL, NULL, '2024-02-08 09:16:53', '2024-02-08 09:16:53'),
(8, 'App\\Models\\User', 2, 'auth_token', 'ee8cc70f80119fa8395a34ce00c44ea2904dafa0434aad17b243f6848c521255', '[\"*\"]', NULL, NULL, '2024-02-08 09:36:54', '2024-02-08 09:36:54'),
(9, 'App\\Models\\User', 2, 'auth_token', 'af814dce59dae9410a4ec883c040581660fd74f4be04f2e9c6fbb7c962a15930', '[\"*\"]', NULL, NULL, '2024-02-08 10:43:57', '2024-02-08 10:43:57'),
(10, 'App\\Models\\User', 2, 'auth_token', '130ab68f57450f429b57b423b650c8acd4711b77e1bab5543671b13ebc8f3a9c', '[\"*\"]', NULL, NULL, '2024-02-08 16:02:01', '2024-02-08 16:02:01'),
(11, 'App\\Models\\User', 2, 'auth_token', '7057c0d061729158ae58ac556c56271fad492f1850c202bc0d0b13401b0a3a25', '[\"*\"]', NULL, NULL, '2024-02-08 16:40:47', '2024-02-08 16:40:47'),
(12, 'App\\Models\\User', 2, 'auth_token', '63a627ca0cc29b8a7514f807f75ae66973af89a08ac35c5c5663eef82da26115', '[\"*\"]', NULL, NULL, '2024-02-08 18:43:04', '2024-02-08 18:43:04'),
(21, 'App\\Models\\User', 2, 'auth_token', '63cc77df1d9df89dc54531af87594786a09db192d593ad57c00b4c2bce1e6676', '[\"*\"]', NULL, NULL, '2024-02-09 11:25:15', '2024-02-09 11:25:15'),
(24, 'App\\Models\\User', 2, 'auth_token', '56ac38141743c8830f189d950fb6c151e1bc917773ae6e75f3126eeb27384451', '[\"*\"]', NULL, NULL, '2024-02-09 12:57:13', '2024-02-09 12:57:13'),
(26, 'App\\Models\\User', 2, 'auth_token', 'a63ba723da024dc76b66410312aa036bd610e8ceb62c6a299541af4b1146ad06', '[\"*\"]', NULL, NULL, '2024-02-09 12:59:51', '2024-02-09 12:59:51'),
(27, 'App\\Models\\User', 2, 'auth_token', '0fb3f99290df1dcfc1aa263b72e9801f9c6e14dfa095416d91c231928f04ff63', '[\"*\"]', NULL, NULL, '2024-02-09 13:10:15', '2024-02-09 13:10:15'),
(28, 'App\\Models\\User', 2, 'auth_token', '936c45f65474589195bbb9be156c35ee4386bc40e62140bd18c70147ae17d936', '[\"*\"]', NULL, NULL, '2024-02-09 13:11:57', '2024-02-09 13:11:57'),
(29, 'App\\Models\\User', 2, 'auth_token', 'bd2277fbdb7ff62914314645f60473f8c19d352d302a5d2fb66f96a11a2df37d', '[\"*\"]', NULL, NULL, '2024-02-09 13:13:45', '2024-02-09 13:13:45'),
(30, 'App\\Models\\User', 2, 'auth_token', '43b89b522872b61b94bf35e26bb1701589431f105766d6b681a72ba6177790b6', '[\"*\"]', '2024-02-09 14:30:54', NULL, '2024-02-09 13:15:01', '2024-02-09 14:30:54'),
(31, 'App\\Models\\User', 2, 'auth_token', '7fda578030716f627fa300477aadc0406207f610988292b5cf9f8722bb7680a4', '[\"*\"]', '2024-02-09 13:30:20', NULL, '2024-02-09 13:28:54', '2024-02-09 13:30:20'),
(35, 'App\\Models\\User', 2, 'auth_token', 'eff067a307c868cf3b03e357e674b3f3713f3b937e85cdc3046770e4c529f1b2', '[\"*\"]', '2024-02-09 14:43:02', NULL, '2024-02-09 14:35:49', '2024-02-09 14:43:02'),
(36, 'App\\Models\\User', 2, 'auth_token', '7c95237f511e7408358b2e629e6a77c3f56b22094ce2b84a5bf1f9ad98c08f2e', '[\"*\"]', '2024-02-09 15:14:43', NULL, '2024-02-09 14:43:22', '2024-02-09 15:14:43'),
(37, 'App\\Models\\User', 2, 'auth_token', 'b6cde2c583b3fe2994d416d891fff0370683175f43f26a139ea17ef8fde4ac53', '[\"*\"]', NULL, NULL, '2024-02-09 15:15:16', '2024-02-09 15:15:16'),
(38, 'App\\Models\\User', 2, 'auth_token', '552f0d63fd9587de6e070e7b70fb8b5e4a46e75d30848963ac0afc81e04436a7', '[\"*\"]', NULL, NULL, '2024-02-09 18:35:19', '2024-02-09 18:35:19'),
(41, 'App\\Models\\User', 2, 'auth_token', '71abbcee17ba3eb07a7e00454e681416c77a75103357a0b2369ae763f8fd98a2', '[\"*\"]', '2024-02-09 19:16:03', NULL, '2024-02-09 19:01:16', '2024-02-09 19:16:03'),
(42, 'App\\Models\\User', 2, 'auth_token', 'a0dfbce6cca8f730cdc4d5e29dbaa3b482b24bc60f5909d37bba3013a429f76c', '[\"*\"]', NULL, NULL, '2024-02-09 19:41:34', '2024-02-09 19:41:34'),
(45, 'App\\Models\\User', 1, 'auth_token', 'ec7e2ad6af8eb58884a86cea566696d3ef902250a3c8ab8f518d7ef05faeffda', '[\"*\"]', '2024-02-09 20:35:36', NULL, '2024-02-09 20:10:14', '2024-02-09 20:35:36'),
(46, 'App\\Models\\User', 1, 'auth_token', 'd86c9c8e1a034ee0b970c0621631cf8ad8bbd52bbdf4c6efda6dcc69f3f8f814', '[\"*\"]', NULL, NULL, '2024-02-10 10:27:28', '2024-02-10 10:27:28'),
(47, 'App\\Models\\User', 2, 'auth_token', 'd45ba8c72256cd34babfa21d672aa9adb534b432b7a848f82d988c77a47d378e', '[\"*\"]', '2024-02-10 10:29:13', NULL, '2024-02-10 10:28:07', '2024-02-10 10:29:13'),
(48, 'App\\Models\\User', 5, 'auth_token', '174f12e4475742ce81999ce32bcf3ae6b5d9b5f9d3d114afc22b22904e52283d', '[\"*\"]', '2024-02-11 21:36:09', NULL, '2024-02-11 21:35:43', '2024-02-11 21:36:09'),
(49, 'App\\Models\\User', 5, 'auth_token', 'a3bbbd28c9430959681fd80b8c04aa45d66876bb57571e42aaa68f612f84621f', '[\"*\"]', '2024-02-11 21:39:09', NULL, '2024-02-11 21:38:25', '2024-02-11 21:39:09'),
(50, 'App\\Models\\User', 6, 'auth_token', '54bb08ee4435b56ff1b9f26bf34f8863ce2ad9955f4b9d9046462512c40b9f1c', '[\"*\"]', '2024-02-11 21:45:04', NULL, '2024-02-11 21:41:06', '2024-02-11 21:45:04'),
(51, 'App\\Models\\User', 7, 'auth_token', 'c82acb893a5ab6c321c253fd93fa26db351afe92d1bc095886ce448e29bffc93', '[\"*\"]', '2024-02-11 21:55:50', NULL, '2024-02-11 21:55:06', '2024-02-11 21:55:50'),
(52, 'App\\Models\\User', 1, 'auth_token', '4d55e490d311d93d2e13106529e97d45c29830872e63a367a558d7c812eda540', '[\"*\"]', NULL, NULL, '2024-02-12 12:08:22', '2024-02-12 12:08:22'),
(53, 'App\\Models\\User', 1, 'auth_token', '8b2a0c8c8db532a71b7f02633ddae50a25f0ccb47f0cc7d8bf5e670397db91df', '[\"*\"]', '2024-02-12 12:25:37', NULL, '2024-02-12 12:08:26', '2024-02-12 12:25:37'),
(54, 'App\\Models\\User', 1, 'auth_token', '8452a49e19e08fb94c298967e0052e23bdfe45083c39f0515869fc170e0363cc', '[\"*\"]', '2024-02-12 12:26:29', NULL, '2024-02-12 12:24:08', '2024-02-12 12:26:29'),
(55, 'App\\Models\\User', 1, 'auth_token', 'f0f99423f577ce10eb32e1c809ab08ee2638e6a388abbdb04d8101b436edd618', '[\"*\"]', NULL, NULL, '2024-02-12 12:48:57', '2024-02-12 12:48:57'),
(56, 'App\\Models\\User', 2, 'auth_token', 'bea2e9479fcf4bd595eae2c711c1fa0414e2f29f02121a21ed32e29053a178d5', '[\"*\"]', '2024-02-12 13:20:56', NULL, '2024-02-12 13:17:24', '2024-02-12 13:20:56'),
(57, 'App\\Models\\User', 4, 'auth_token', '1dd33c8ba29a6c31964227b8d2f28c81fc49470ba1c6748a928887f2478690f0', '[\"*\"]', '2024-02-12 15:19:54', NULL, '2024-02-12 14:10:31', '2024-02-12 15:19:54'),
(58, 'App\\Models\\User', 4, 'auth_token', '7803adf6df0320d450b07b4a6e73af49ed32b42ba63d0813144dc8b6de169411', '[\"*\"]', NULL, NULL, '2024-02-12 15:16:26', '2024-02-12 15:16:26'),
(59, 'App\\Models\\User', 1, 'auth_token', 'e5ef292c5f2fb855c8e449454e3ed156b8d4f4aef901f095c77fb95018007168', '[\"*\"]', '2024-02-12 15:28:40', NULL, '2024-02-12 15:28:07', '2024-02-12 15:28:40'),
(60, 'App\\Models\\User', 2, 'auth_token', 'fee29d14f245d095026dd978109955b5dfa9a81528e4479cc515a4db135e656b', '[\"*\"]', '2024-02-12 15:31:53', NULL, '2024-02-12 15:30:31', '2024-02-12 15:31:53');

-- --------------------------------------------------------

--
-- Table structure for table `restaurants`
--

CREATE TABLE `restaurants` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `address` varchar(255) NOT NULL,
  `contact_phone_number` varchar(255) NOT NULL,
  `category_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `contact_email_address` varchar(255) DEFAULT NULL,
  `image` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `restaurants`
--

INSERT INTO `restaurants` (`id`, `name`, `description`, `address`, `contact_phone_number`, `category_id`, `created_at`, `updated_at`, `contact_email_address`, `image`) VALUES
(1, 'Sinđelić', 'A restaurant with a long tradition. You can get to eat anything you can imagine. The food is very tasty. Pleasant place with good live music in the evening. The staff is perfect, attentive and kind.', 'Vojislava Ilića 88, Beograd', '+381 11 3087067', 3, '2024-02-07 10:09:45', '2024-02-07 10:37:38', 'info@restoransindjelic.com', 'https://restorani.rs/storage/images/restaurants/galleries/15634501352145803461_gallery.jpg'),
(2, 'Zapata', 'Attracted by the excellent food and the rich offer of drinks, cocktails, wine, as well as the best Mexican tequilas, the excellent atmosphere, our guests recognized the quality in everything that was offered to them', 'Njegoševa 44, Beograd', '+381 11 317852', 2, '2024-02-07 10:18:27', '2024-02-07 10:37:07', 'info@zapata.com', 'https://www.beogradnocu.com/wp-content/uploads/2014/07/bgnocu-71.jpg'),
(3, 'Sakura', 'Sakura offers dishes such as\r\nsushi, sea bass \"usuzukuri\", wagyu tartar, Chilean sea bass, steak \"tobanyaki\",\r\ntuna shimeji, as well as black cod from the Sea of Japan.', 'Karađorđeva 2-4, Beograd', '+381 11 3284988', 1, '2024-02-07 10:35:37', '2024-02-07 10:36:33', 'info@sakura.com', 'https://www.gdecemo.rs/images/company/large/IMG_9661-HDR-wakn.jpg'),
(4, 'Intergalactic diner', 'With its roots in the feel good culture of the 60s, Intergalactic Diner is a combination of good music, looks and atmosphere. In addition, we place special emphasis on the high quality of food and the message of a certain future among the stars.', 'Internacionalnih brigada 22, Beograd', '+381 11 2434444', 4, '2024-02-07 10:47:31', '2024-02-07 10:47:31', 'info@intergalacticdiner.com', 'https://3.bp.blogspot.com/-Qs4CxJJM_bc/W_AeW3YHGzI/AAAAAAAACCg/4b2lZyD7Uf8oMMuTLvddsw4H-q6SudmVACLcBGAs/s1600/107.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `role_name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `role_name`, `created_at`, `updated_at`) VALUES
(1, 'admin', NULL, NULL),
(2, 'logged in user', NULL, NULL),
(3, 'delivery guy', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `role_id` bigint(20) UNSIGNED NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `address`, `role_id`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Deki', 'dejan@gmail.com', NULL, '$2y$12$/v.302FPczcmnojDssneUelhlEdRePxj/DE/2T8RCTPRTBcVhXOMe', 'Ustanicka 156', 1, NULL, '2024-02-07 10:10:14', '2024-02-12 12:31:19'),
(2, 'Sonja', 'sonja@gmail.com', NULL, '$2y$12$WC1t6sxilBrD7O1o4y.01uqdJlXiYHxT72oiogSZZngT.7FXURZgS', 'Ustanicka 156', 2, NULL, '2024-02-07 18:55:20', '2024-02-12 15:33:26'),
(4, 'Mile', 'mile@gmail.com', NULL, '$2y$12$./BcZYiqxaauKOPgMiTHOufKVQdRGC8/VSc9/ZVy.ABw7Izkkrk0m', 'Ustanicka 156', 3, NULL, '2024-02-09 20:08:12', '2024-02-09 20:08:12'),
(5, 'Ana', 'ana@gmail.com', NULL, '$2y$12$LjyG.tPWMsqF2OwRSg01puNfVISXjTBlt3fG1Lj08schAykTnvFBK', 'Ustanicka 88', 2, NULL, '2024-02-11 21:35:43', '2024-02-11 21:35:43'),
(6, 'Svetlana Pavlovic', 'ceca@gmail.com', NULL, '$2y$12$EZGY6FlkxcJbBt1kT91/sekggkF/VmU9vwdSBeBq59eEXv84kW5bi', 'Ustanicka 88', 2, NULL, '2024-02-11 21:41:06', '2024-02-11 21:41:06'),
(7, 'Milovan', 'milovan@gmail.com', NULL, '$2y$12$JpG.3/a4R7gIgPVMyyc.c.sAXy08smSnROBNxiuLv45inSFcAPJ/S', 'Vladimira Tomanovica 55', 2, NULL, '2024-02-11 21:55:06', '2024-02-11 21:55:06');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `items`
--
ALTER TABLE `items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `items_restaurant_id_foreign` (`restaurant_id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `orders_order_number_unique` (`order_number`),
  ADD KEY `orders_user_id_foreign` (`user_id`),
  ADD KEY `orders_restaurant_id_foreign` (`restaurant_id`);

--
-- Indexes for table `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_items_item_id_foreign` (`item_id`),
  ADD KEY `order_items_order_id_foreign` (`order_id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `restaurants`
--
ALTER TABLE `restaurants`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `items`
--
ALTER TABLE `items`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT for table `restaurants`
--
ALTER TABLE `restaurants`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `items`
--
ALTER TABLE `items`
  ADD CONSTRAINT `items_restaurant_id_foreign` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurants` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_restaurant_id_foreign` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurants` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `orders_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `order_items_item_id_foreign` FOREIGN KEY (`item_id`) REFERENCES `items` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `order_items_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
