yarn run build
yarn run serve-static-files &
yarn run pa11y &
wait
pkill -P $$
