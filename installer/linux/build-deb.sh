#!/usr/bin/env bash
#
# Builds the Debian package from a published linux-x64 build.
#
# Run it on Debian/Ubuntu, or in the container the release workflow uses:
#   docker run --rm -v "$PWD:/src" -w /src -e VERSION=0.10.4 debian:stable \
#     bash -c "installer/linux/build-deb.sh"
#
# The version, publish directory and output directory come from the environment, so the same script
# works locally and in CI.
set -euo pipefail

version="${VERSION:?VERSION must be set, e.g. 0.10.4}"
publish_dir="${PUBLISH_DIR:-publish/linux-x64}"
output_dir="${OUTPUT_DIR:-release}"
here="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
repo="$(cd "$here/../.." && pwd)"

# Paths may be absolute (a local run) or relative to the repository (what CI passes).
[[ "$publish_dir" = /* ]] || publish_dir="$repo/$publish_dir"
[[ "$output_dir" = /* ]] || output_dir="$repo/$output_dir"

if [[ ! -f "$publish_dir/URLCheck" ]]; then
    echo "No URLCheck in $publish_dir; publish for linux-x64 first." >&2
    exit 1
fi

stage="$(mktemp -d)"
trap 'rm -rf "$stage"' EXIT

install -Dpm 0755 "$publish_dir/URLCheck" "$stage/opt/URLCheck/URLCheck"
install -Dpm 0644 "$here/urlcheck.desktop" "$stage/usr/share/applications/urlcheck.desktop"
install -Dpm 0644 "$here/urlcheck.png" "$stage/usr/share/icons/hicolor/256x256/apps/urlcheck.png"

mkdir -p "$stage/usr/bin"
ln -s /opt/URLCheck/URLCheck "$stage/usr/bin/urlcheck"

mkdir -p "$stage/DEBIAN"

cat > "$stage/DEBIAN/control" <<EOF
Package: urlcheck
Version: $version
Section: net
Priority: optional
Architecture: amd64
Maintainer: yukiyosanako <yukiyosanako@users.noreply.github.com>
Installed-Size: $(du -sk "$stage" | cut -f1)
Depends: libgtk-3-0 | libgtk-3-0t64, libwebkit2gtk-4.1-0, libnotify4, libicu72 | libicu74 | libicu76, libssl3 | libssl3t64, zlib1g, libkrb5-3, fontconfig, libfreetype6
Homepage: https://github.com/T2PeNBiX99wcoxKv3A4g/URLCheck
Description: Link intermediary that inspects and cleans a URL before opening it
 URLCheck takes over your http and https links, shows the address with every
 parameter, and lets you strip tracking parameters or switch the scheme before
 the link is handed to a real browser.
 .
 It also keeps a history of the inspected links and can forward one to another
 URLCheck device on the same network.
EOF

# Refresh the caches that hold the desktop entry and the icon, like the RPM does.
for script in postinst postrm; do
    cat > "$stage/DEBIAN/$script" <<'EOF'
#!/bin/sh
set -e
if command -v update-desktop-database >/dev/null 2>&1; then
    update-desktop-database -q /usr/share/applications || true
fi
if command -v gtk-update-icon-cache >/dev/null 2>&1; then
    gtk-update-icon-cache -q -t /usr/share/icons/hicolor || true
fi
EOF
    chmod 0755 "$stage/DEBIAN/$script"
done

mkdir -p "$output_dir"
dpkg-deb --root-owner-group --build "$stage" "$output_dir/urlcheck_${version}_amd64.deb"
ls -l "$output_dir"/*.deb
